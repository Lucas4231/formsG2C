declare module 'cpf-cnpj-validator' {
  interface Validator {
    cpf: {
      isValid(cpf: string): boolean;
    };
    cnpj: {
      isValid(cnpj: string): boolean;
    };
  }

  export const validator: Validator;
} 