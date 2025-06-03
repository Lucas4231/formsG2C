import { google } from 'googleapis';

interface Dependente {
  nome: string;
  cpf: string;
  dataNascimento: string;
  municipioNascimento: string;
  ufNascimento: string;
  tipoDependente: string;
  possuiOutroDependente: string;
}

// Interface para os dados do formulário
interface FormData {
  nomeEmpresa: string;
  nomeResponsavel: string;
  nome: string;
  nomeMae: string;
  nomePai: string;
  sexo: string;
  email: string;
  telefone: string;
  celular: string;
  dataNascimento: string;
  municipioNascimento: string;
  estadoCivil: string;
  corPele: string;
  escolaridade: string;
  cpf: string;
  pis: string;
  docIdentificacao: string;
  orgaoExpeditor: string;
  dataExpedicao: string;
  carteiraTrabalho: string;
  dataExpedicaoCT: string;
  cnh: string;
  categoriaCNH: string;
  dataExpedicaoCNH: string;
  dataValidadeCNH: string;
  dataPrimeiraHabilitacao: string;
  tituloEleitor: string;
  carteiraReservista: string;
  dataExpedicaoReservista: string;
  endereco: string;
  numeroEndereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  observacoes: string;
  foto: File | null;
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  tipoChavePix: string;
  chavePix: string;
  observacoesBancarias: string;
  possuiDependentes: boolean;
  dependentes: Dependente[];
  nomeConjuge: string;
  cpfConjuge: string;
  dataNascimentoConjuge: string;
  responsavelPreenchimento: string;
  cargo: string;
  funcao: string;
  salario: string;
  dataAdmissao: string;
  optanteValeTransporte: string;
  valorPassagem: string;
  nomeResponsavelPreenchimento: string;
  periodoExperiencia: string;
  jornadaTrabalho: string;
  jornadaParcial: string;
  adicionalPericulosidade: string;
  adicionalInsalubridade: string;
  quantidadePassagem: string;
  valeCombustivel: string;
  valorValeCombustivel: string;
  tipoDescontoCombustivel: string;
  valorDescontoCombustivel: string;
  concordaTermos: boolean;
  declaraInformacoes: boolean;
  documentoIdentidade: File | null;
  [key: string]: string | File | null | boolean | Dependente[];
}

// Configuração do cliente do Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Função para adicionar uma nova linha na planilha
export async function appendToSheet(formData: FormData) {
  try {
    const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
    
    // Função auxiliar para tratar campos vazios
    const getValue = (value: any): string => {
      if (value === null || value === undefined || value === '' || value === false) {
        return 'Sem informação';
      }
      return String(value);
    };

    // Função para formatar valores dos selects
    const formatSelectValue = (value: string, type: string): string => {
      if (!value) return 'Sem informação';
      
      const selectValues: Record<string, Record<string, string>> = {
        sexo: {
          masculino: 'Masculino',
          feminino: 'Feminino',
          outro: 'Outro'
        },
        estadoCivil: {
          solteiro: 'Solteiro(a)',
          casado: 'Casado(a)',
          divorciado: 'Divorciado(a)',
          viuvo: 'Viúvo(a)',
          separado: 'Separado(a)'
        },
        corPele: {
          branca: 'Branca',
          preta: 'Preta',
          parda: 'Parda',
          amarela: 'Amarela',
          indigena: 'Indígena'
        },
        escolaridade: {
          analfabeto: 'Analfabeto',
          ate_5_ano_incompleto: 'Até o 5º ano incompleto do Ensino Fundamental',
          '5_ano_completo': '5º ano completo do Ensino Fundamental',
          '6_ao_9_ano_incompleto': 'Do 6º ao 9º ano do Ensino Fundamental incompleto',
          ensino_fundamental_completo: 'Ensino Fundamental completo',
          ensino_medio_incompleto: 'Ensino Médio incompleto',
          ensino_medio_completo: 'Ensino Médio completo',
          ensino_superior_incompleto: 'Ensino Superior incompleto',
          ensino_superior_completo: 'Ensino Superior completo',
          pos_graduacao: 'Pós Graduação',
          mestrado: 'Mestrado',
          doutorado: 'Doutorado'
        },
        tipoConta: {
          corrente: 'Conta Corrente',
          poupanca: 'Conta Poupança',
          salario: 'Conta Salário'
        }
      };

      return selectValues[type]?.[value] || value;
    };

    // Prepara os valores para a planilha
    const values = [
      getValue(formData.nomeEmpresa), // Nome da Empresa
      getValue(formData.nomeResponsavel), // Nome do Responsável
      getValue(formData.nome), // Nome
      getValue(formData.nomeMae), // Nome da Mãe
      getValue(formData.nomePai), // Nome do Pai
      formatSelectValue(formData.sexo, 'sexo'), // Sexo
      getValue(formData.email), // Email
      getValue(formData.telefone), // Telefone
      getValue(formData.celular), // Celular
      getValue(formData.dataNascimento), // Data de Nascimento
      getValue(formData.municipioNascimento), // Município de Nascimento
      formatSelectValue(formData.estadoCivil, 'estadoCivil'), // Estado Civil
      formatSelectValue(formData.corPele, 'corPele'), // Cor da Pele
      formatSelectValue(formData.escolaridade, 'escolaridade'), // Grau de Instituição
      getValue(formData.cpf), // CPF
      getValue(formData.pis), // PIS
      getValue(formData.docIdentificacao), // RG
      getValue(formData.orgaoExpeditor), // Órgão Emissor
      getValue(formData.dataExpedicao), // Data de Emissão
      getValue(formData.carteiraTrabalho), // CT
      getValue(formData.dataExpedicaoCT), // Data de Emissão CT
      getValue(formData.cnh), // CNH
      getValue(formData.categoriaCNH), // Categoria
      getValue(formData.dataExpedicaoCNH), // Data de Expedição CNH
      getValue(formData.dataValidadeCNH), // Data de Validade
      getValue(formData.dataPrimeiraHabilitacao), // Data de Primeira Habilitação
      getValue(formData.tituloEleitor), // Título de Eleitor
      getValue(formData.carteiraReservista), // Carteira de Reservista (Nº)
      getValue(formData.dataExpedicaoReservista), // Data de Expedição CR
      getValue(formData.endereco), // Endereço
      getValue(formData.numeroEndereco), // Número
      getValue(formData.bairro), // Bairro
      getValue(formData.cidade), // Cidade
      getValue(formData.estado), // Estado
      getValue(formData.cep), // CEP
      getValue(formData.observacoes), // Observações
      getValue(formData.foto), // Foto
      getValue(formData.banco), // Banco
      getValue(formData.agencia), // Agência
      getValue(formData.conta), // Nº da Conta
      formatSelectValue(formData.tipoConta, 'tipoConta'), // Tipo de Conta
      getValue(formData.tipoChavePix), // Tipo de Chave Pix
      getValue(formData.chavePix), // Chave Pix
      getValue(formData.observacoesBancarias), // Observações Bancárias
      formData.possuiDependentes, // Possui Dependentes
      formData.dependentes?.[0]?.nome || 'Sem dependente', // Nome Dependente
      formData.dependentes?.[0]?.cpf || 'Sem dependente', // CPF Dependente
      formData.dependentes?.[0]?.dataNascimento || 'Sem dependente', // Data de Nascimento do Dependente
      formData.dependentes?.[0]?.ufNascimento || 'Sem dependente', // UF de Nascimento
      formData.dependentes?.[0]?.municipioNascimento || 'Sem dependente', // Município de Nascimento
      formData.dependentes?.[0]?.tipoDependente || 'Sem dependente', // Tipo de Dependente
      getValue(formData.nomeConjuge), // Nome do Conjuge
      getValue(formData.cpfConjuge), // CPF do Conjuge
      getValue(formData.dataNascimentoConjuge), // Data de Nascimento do Conjuge
      getValue(formData.responsavelPreenchimento), // Responsável pelo Preenchimento
      `${getValue(formData.cargo)} / ${getValue(formData.funcao)}`, // Cargo / Função
      getValue(formData.salario), // Valor Salário
      getValue(formData.dataAdmissao), // Data de Admissão
      getValue(formData.optanteValeTransporte), // Optante Vale Transporte
      getValue(formData.valorPassagem), // Valor da Passagem
      getValue(formData.nomeResponsavelPreenchimento), // Nome do Responsável pelo Preenchimento
      getValue(formData.periodoExperiencia), // Período de Experiência
      getValue(formData.jornadaTrabalho), // Jornada de Trabalho
      getValue(formData.jornadaParcial), // Jornada Parcial
      getValue(formData.adicionalPericulosidade), // Adicional de Periculosidade
      getValue(formData.adicionalInsalubridade), // Adicional de Insalubridade
      getValue(formData.quantidadePassagem), // Quantidade de Passagem
      getValue(formData.valeCombustivel), // Vale de Combustível
      getValue(formData.valorValeCombustivel), // Valor do Vale de Combustível
      getValue(formData.tipoDescontoCombustivel), // Tipo de Desconto de Combustível
      getValue(formData.valorDescontoCombustivel), // Valor do Desconto de Combustível
      formData.concordeTermos, // Concorde com os Termos
      formData.declaraInformacoes, // Declara Informações
      getValue(formData.documentoIdentidade), // Foto Documento
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:AR', // Ajustado para cobrir todas as colunas
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    console.log('Dados adicionados com sucesso:', response.data);
    return true;
  } catch (error) {
    console.error('Erro ao adicionar dados na planilha:', error);
    throw error;
  }
} 