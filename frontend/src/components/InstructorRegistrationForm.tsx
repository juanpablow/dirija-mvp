"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useInstructorRegistration } from "@/hooks/useApi";
import { trackInstructorLead } from "@/lib/gtag";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export function InstructorRegistrationForm() {
  const {
    register: registerField,
    handleSubmit: handleFormSubmit,
    formState: { errors, touchedFields },
    setValue,
    reset: resetForm,
    watch,
    trigger,
  } = useForm<FormData>({
    mode: "onBlur", // Valida quando perde o foco
    reValidateMode: "onChange", // Revalida em tempo real após primeira validação
  });

  const {
    register: registerInstructor,
    loading,
    error,
    success,
    reset: resetApi,
  } = useInstructorRegistration();

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara: (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Remove a formatação do telefone antes de enviar
      const phoneNumbers = data.phone.replace(/\D/g, "");

      await registerInstructor({
        ...data,
        phone: phoneNumbers,
      });

      // Rastrear conversão do Google Ads
      trackInstructorLead();

      // Scroll suave para a mensagem de sucesso
      setTimeout(() => {
        document
          .getElementById("instructor-form")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      console.error("Erro ao enviar cadastro:", err);
    }
  };

  const handleReset = () => {
    resetApi();
    resetForm();
  };

  const formValues = watch();

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Cadastro Recebido!
        </h3>
        <p className="text-gray-600 mb-4">
          Obrigado pelo interesse, <strong>{formValues.name}</strong>!
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900 mb-2">
            📧 <strong>Verifique seu email!</strong>
          </p>
          <p className="text-sm text-blue-800">
            Enviamos uma mensagem para <strong>{formValues.email}</strong> com
            mais detalhes sobre os próximos passos.
          </p>
          <p className="text-xs text-blue-700 mt-2">
            💡 Não recebeu? Verifique sua caixa de spam ou lixo eletrônico.
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-8">
          Nossa equipe irá analisar seu cadastro e entrará em contato em breve
          através do email ou telefone <strong>{formValues.phone}</strong>.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          Fazer novo cadastro
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Aviso sobre Certificação */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-500 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              📋 Certificação do Detran Necessária
            </h4>
            <p className="text-sm text-blue-800 mb-2">
              Para atuar como instrutor autônomo, você precisará obter a
              certificação oficial do Detran através de um curso de formação
              gratuito.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900 underline"
            >
              Ver requisitos completos e como obter certificação
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Preencha seus dados
      </h3>
      <p className="text-gray-600 mb-6">
        Nossa equipe entrará em contato em breve
      </p>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Campo Nome Completo */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome completo"
            {...registerField("name", {
              required: "Nome completo é obrigatório",
              minLength: {
                value: 3,
                message: "Nome deve ter no mínimo 3 caracteres",
              },
              validate: (value) => {
                const names = value.trim().split(" ").filter(Boolean);
                if (names.length < 2) {
                  return "Por favor, digite seu nome completo (nome e sobrenome)";
                }
                return true;
              },
              onChange: (e) => {
                if (touchedFields.name || errors.name) {
                  trigger("name");
                }
              },
            })}
            className={`block w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
              errors.name
                ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            }`}
          />
          {errors.name && (
            <div className="mt-1 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            {...registerField("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
              onChange: (e) => {
                if (touchedFields.email || errors.email) {
                  trigger("email");
                }
              },
            })}
            className={`block w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
              errors.email
                ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            }`}
          />
          {errors.email && (
            <div className="mt-1 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Campo Telefone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(11) 98765-4321"
            maxLength={15}
            {...registerField("phone", {
              required: "Telefone é obrigatório",
              validate: (value) => {
                const numbers = value.replace(/\D/g, "");
                if (numbers.length < 10) {
                  return "Telefone incompleto";
                }
                if (numbers.length === 10 || numbers.length === 11) {
                  return true;
                }
                return "Telefone inválido";
              },
            })}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue("phone", formatted);
              if (touchedFields.phone || errors.phone) {
                trigger("phone");
              }
            }}
            className={`block w-full px-4 py-3 border rounded-lg shadow-sm transition-colors ${
              errors.phone
                ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            }`}
          />
          {errors.phone && (
            <div className="mt-1 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{errors.phone.message}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Quero ser Instrutor
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </>
  );
}
