import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import './App.css'
import logo from './assets/G2C_logo_azul.png'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

interface Dependente {
  nome: string;
  cpf: string;
  dataNascimento: string;
  municipioNascimento: string;
  ufNascimento: string;
  tipoDependente: string;
  possuiOutroDependente: string;
}

interface FormData {
  [key: string]: string | File | null | boolean | Dependente[];
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
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  observacoes: string;
  foto: File | null;
  banco: string;
  agenciaConta: string;
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
  cargoFuncao: string;
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
}

// Lista de estados brasileiros
const estados = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentDependenteIndex, setCurrentDependenteIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: '',
    nomeResponsavel: '',
    nome: '',
    nomeMae: '',
    nomePai: '',
    sexo: '',
    email: '',
    telefone: '',
    celular: '',
    dataNascimento: '',
    municipioNascimento: '',
    estadoCivil: '',
    corPele: '',
    escolaridade: '',
    cpf: '',
    pis: '',
    docIdentificacao: '',
    orgaoExpeditor: '',
    dataExpedicao: '',
    carteiraTrabalho: '',
    dataExpedicaoCT: '',
    cnh: '',
    categoriaCNH: '',
    dataExpedicaoCNH: '',
    dataValidadeCNH: '',
    dataPrimeiraHabilitacao: '',
    tituloEleitor: '',
    carteiraReservista: '',
    dataExpedicaoReservista: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    observacoes: '',
    foto: null,
    banco: '',
    agenciaConta: '',
    tipoConta: '',
    tipoChavePix: '',
    chavePix: '',
    observacoesBancarias: '',
    possuiDependentes: false,
    dependentes: [],
    nomeConjuge: '',
    cpfConjuge: '',
    dataNascimentoConjuge: '',
    responsavelPreenchimento: '',
    cargoFuncao: '',
    salario: '',
    dataAdmissao: '',
    optanteValeTransporte: '',
    valorPassagem: '',
    nomeResponsavelPreenchimento: '',
    periodoExperiencia: '',
    jornadaTrabalho: '',
    jornadaParcial: '',
    adicionalPericulosidade: '',
    adicionalInsalubridade: '',
    quantidadePassagem: '',
    valeCombustivel: '',
    valorValeCombustivel: '',
    tipoDescontoCombustivel: '',
    valorDescontoCombustivel: '',
    concordaTermos: false,
    declaraInformacoes: false,
    documentoIdentidade: null
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const formatarData = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 8 dígitos (DDMMAAAA)
    const limitedNumbers = numbers.slice(0, 8)
    
    // Aplica a máscara
    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 4) {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`
    } else {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4)}`
    }
  }

  const formatarMoeda = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Converte para número e divide por 100 para ter os centavos
    const amount = Number(numbers) / 100
    
    // Formata o número como moeda
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement

    // Aplicar máscaras para telefone, celular e CPF
    if (name === 'telefone' || name === 'celular' || name === 'cpf' || name === 'cpfConjuge') {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/\D/g, '')
      
      // Aplica a máscara apropriada
      let maskedValue = ''
      if (name === 'telefone') {
        if (numbers.length <= 10) {
          maskedValue = numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        } else {
          maskedValue = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        }
      } else if (name === 'celular') {
        maskedValue = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      } else if (name === 'cpf' || name === 'cpfConjuge') {
        // Limita a 11 dígitos
        const cpfNumbers = numbers.slice(0, 11)
        maskedValue = cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      }

      setFormData(prev => ({
        ...prev,
        [name]: maskedValue
      }))
      return
    }

    // Aplicar máscara para campos de data
    if (name.includes('data') || name === 'dataExpedicao' || name === 'dataExpedicaoCT' || 
        name === 'dataExpedicaoCNH' || name === 'dataValidadeCNH' || name === 'dataPrimeiraHabilitacao' || 
        name === 'dataExpedicaoReservista' || name === 'dataNascimentoConjuge' || name === 'dataAdmissao') {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/\D/g, '')
      
      // Limita a 8 dígitos (DDMMAAAA)
      const limitedNumbers = numbers.slice(0, 8)
      
      // Aplica a máscara
      let maskedValue = ''
      if (limitedNumbers.length <= 2) {
        maskedValue = limitedNumbers
      } else if (limitedNumbers.length <= 4) {
        maskedValue = `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`
      } else {
        maskedValue = `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4)}`
      }

      setFormData(prev => ({
        ...prev,
        [name]: maskedValue
      }))
      return
    }

    // Aplicar máscara para campos monetários
    if (name === 'salario' || name === 'valorPassagem') {
      const formattedValue = formatarMoeda(value)
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const validatePage1 = () => {
    const requiredFields = {
      nomeEmpresa: 'Nome da Empresa'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const validatePage2 = () => {
    const requiredFields = {
      nome: 'Nome do Funcionário',
      nomeMae: 'Nome da mãe',
      sexo: 'Sexo',
      email: 'Email',
      celular: 'Celular',
      dataNascimento: 'Data de Nascimento',
      municipioNascimento: 'Município de Nascimento',
      estadoCivil: 'Estado Civil',
      corPele: 'Cor da Pele',
      escolaridade: 'Escolaridade',
      cpf: 'CPF'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    // Validação do email
    if (!formData.email.includes('@')) {
      Swal.fire({
        title: 'Email Inválido',
        text: 'Por favor, insira um email válido contendo @',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    return true
  }

  const validatePage3 = () => {
    const requiredFields = {
      endereco: 'Endereço',
      bairro: 'Bairro',
      cidade: 'Cidade',
      estado: 'Estado',
      cep: 'CEP'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const validatePage4 = () => {
    return true; // Sempre retorna true, permitindo avançar independente do preenchimento
  }

  const validatePage5 = () => {
    if (formData.possuiDependentes === undefined) {
      Swal.fire({
        title: 'Campo Obrigatório',
        html: 'Por favor, responda se possui dependentes para fins de Salário Família e/ou Dedução de IR.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const validateDependentePage = (index: number) => {
    const dependente = formData.dependentes[index]
    if (!dependente?.nome || !dependente?.cpf || !dependente?.dataNascimento || 
        !dependente?.municipioNascimento || !dependente?.ufNascimento || !dependente?.tipoDependente || 
        !dependente?.possuiOutroDependente) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: 'Por favor, preencha todos os campos obrigatórios do dependente.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const validatePage9 = () => {
    if (!formData.responsavelPreenchimento) {
      Swal.fire({
        title: 'Campo Obrigatório',
        text: 'Por favor, selecione quem é o responsável pelo preenchimento do formulário.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const validatePage10 = () => {
    const requiredFields = {
      cargoFuncao: 'Cargo/Função',
      dataAdmissao: 'Data de admissão',
      optanteValeTransporte: 'Optante de vale transporte'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    // Validação adicional para valor da passagem se for optante
    if (formData.optanteValeTransporte === 'Sim' && !formData.valorPassagem) {
      Swal.fire({
        title: 'Campo Obrigatório',
        text: 'Por favor, informe o valor da passagem.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    return true
  }

  const validatePage11 = () => {
    const requiredFields = {
      nomeResponsavelPreenchimento: 'Nome do responsável pelo preenchimento',
      cargoFuncao: 'Cargo/Função',
      salario: 'Salário',
      dataAdmissao: 'Data de admissão',
      periodoExperiencia: 'Período de Experiência',
      jornadaTrabalho: 'Jornada de Trabalho',
      jornadaParcial: 'Jornada Parcial',
      adicionalPericulosidade: 'Adicional de Periculosidade',
      adicionalInsalubridade: 'Adicional de Insalubridade',
      optanteValeTransporte: 'Optante de vale transporte',
      valeCombustivel: 'Vale Combustível'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    // Validações condicionais
    if (formData.optanteValeTransporte === 'Sim') {
      if (!formData.valorPassagem || !formData.quantidadePassagem) {
        Swal.fire({
          title: 'Campos Obrigatórios',
          text: 'Por favor, preencha o valor e a quantidade de passagens.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#646cff'
        })
        return false
      }
    }

    if (formData.valeCombustivel === 'Sim') {
      if (!formData.valorValeCombustivel || !formData.tipoDescontoCombustivel || !formData.valorDescontoCombustivel) {
        Swal.fire({
          title: 'Campos Obrigatórios',
          text: 'Por favor, preencha todos os campos do vale combustível.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#646cff'
        })
        return false
      }
    }

    return true
  }

  const validatePage12 = () => {
    if (!formData.concordaTermos || !formData.declaraInformacoes) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        text: 'Por favor, leia e concorde com os termos de uso e declare que as informações são verdadeiras.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    let canProceed = true

    switch (currentPage) {
      case 1:
        canProceed = validatePage1()
        break
      case 2:
        canProceed = validatePage2()
        break
      case 3:
        canProceed = validatePage3()
        break
      case 4:
        canProceed = validatePage4()
        break
      case 5:
        canProceed = validatePage5()
        break
      case 6:
        canProceed = validateDependentePage(currentDependenteIndex)
        break
      case 7:
        canProceed = validatePage9()
        break
      case 8:
        canProceed = validatePage8()
        break
      case 9:
        canProceed = validatePage10()
        break
      case 10:
        canProceed = validatePage11()
        break
      case 11:
        canProceed = validatePage12()
        break
    }

    if (canProceed) {
      if (currentPage === 5 && formData.possuiDependentes) {
        if (currentDependenteIndex < formData.dependentes.length - 1) {
          setCurrentDependenteIndex(prev => prev + 1)
        } else {
          setCurrentPage(prev => prev + 1)
        }
      } else {
        setCurrentPage(prev => prev + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentPage > 1) {
      if (currentPage === 13) {
        setCurrentPage(12) // Volta para a página dos termos de uso
      } else if (currentPage === 12) {
        // Volta para a página correta baseado na escolha do responsável pelo preenchimento
        if (formData.responsavelPreenchimento === 'Empregado') {
          setCurrentPage(10)
        } else {
          setCurrentPage(11)
        }
      } else if (currentPage === 11 || currentPage === 10) {
        setCurrentPage(9) // Sempre volta para a página 9 quando estiver nas páginas 10 ou 11
      } else if (currentPage === 9) {
        setCurrentPage(8)
      } else if (currentPage === 8) {
        // Se não possui dependentes, volta para a página 5 (pergunta sobre dependentes)
        // Se possui dependentes, volta para a última página de dependente preenchida
        if (formData.possuiDependentes === false) {
          setCurrentPage(5)
        } else {
          // Encontra o último dependente que foi preenchido
          const ultimoDependenteIndex = formData.dependentes.findIndex(d => d.possuiOutroDependente === 'Não')
          if (ultimoDependenteIndex === -1) {
            // Se não encontrar nenhum dependente com "Não", usa o último da lista
            setCurrentPage(6 + formData.dependentes.length - 1)
          } else {
            setCurrentPage(6 + ultimoDependenteIndex)
          }
        }
      } else if (currentPage >= 6 && currentPage < 8) {
        // Se estiver na primeira página de dependente, volta para a página 5
        if (currentPage === 6) {
          setCurrentPage(5)
        } else {
          setCurrentPage(currentPage - 1)
        }
      } else {
        setCurrentPage(prev => prev - 1)
      }
    }
  }

  const handleClear = () => {
    Swal.fire({
      title: 'Limpar Formulário',
      text: 'Tem certeza que deseja limpar todo o formulário?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          nomeEmpresa: '',
          nomeResponsavel: '',
          nome: '',
          nomeMae: '',
          nomePai: '',
          sexo: '',
          email: '',
          telefone: '',
          celular: '',
          dataNascimento: '',
          municipioNascimento: '',
          estadoCivil: '',
          corPele: '',
          escolaridade: '',
          cpf: '',
          pis: '',
          docIdentificacao: '',
          orgaoExpeditor: '',
          dataExpedicao: '',
          carteiraTrabalho: '',
          dataExpedicaoCT: '',
          cnh: '',
          categoriaCNH: '',
          dataExpedicaoCNH: '',
          dataValidadeCNH: '',
          dataPrimeiraHabilitacao: '',
          tituloEleitor: '',
          carteiraReservista: '',
          dataExpedicaoReservista: '',
          endereco: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          observacoes: '',
          foto: null,
          banco: '',
          agenciaConta: '',
          tipoConta: '',
          tipoChavePix: '',
          chavePix: '',
          observacoesBancarias: '',
          possuiDependentes: false,
          dependentes: [],
          nomeConjuge: '',
          cpfConjuge: '',
          dataNascimentoConjuge: '',
          responsavelPreenchimento: '',
          cargoFuncao: '',
          salario: '',
          dataAdmissao: '',
          optanteValeTransporte: '',
          valorPassagem: '',
          nomeResponsavelPreenchimento: '',
          periodoExperiencia: '',
          jornadaTrabalho: '',
          jornadaParcial: '',
          adicionalPericulosidade: '',
          adicionalInsalubridade: '',
          quantidadePassagem: '',
          valeCombustivel: '',
          valorValeCombustivel: '',
          tipoDescontoCombustivel: '',
          valorDescontoCombustivel: '',
          concordaTermos: false,
          declaraInformacoes: false,
          documentoIdentidade: null
        })
        setCurrentPage(1)
        Swal.fire({
          title: 'Formulário Limpo!',
          text: 'Todos os campos foram limpos com sucesso.',
          icon: 'success',
          confirmButtonColor: '#646cff',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleDependenteChange = (index: number, field: keyof Dependente, value: string) => {
    const novosDependentes = [...formData.dependentes]
    if (!novosDependentes[index]) {
      novosDependentes[index] = {
        nome: '',
        cpf: '',
        dataNascimento: '',
        municipioNascimento: '',
        ufNascimento: '',
        tipoDependente: '',
        possuiOutroDependente: ''
      }
    }

    // Aplica máscara para o CPF do dependente
    if (field === 'cpf') {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/\D/g, '')
      // Limita a 11 dígitos
      const cpfNumbers = numbers.slice(0, 11)
      // Aplica a máscara
      value = cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    // Aplica máscara para data de nascimento do dependente
    if (field === 'dataNascimento') {
      value = formatarData(value)
    }

    novosDependentes[index] = {
      ...novosDependentes[index],
      [field]: value
    }
    setFormData(prev => ({ ...prev, dependentes: novosDependentes }))
  }

  // Página 1 - Dados da Empresa
  const renderPage1 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor="nomeEmpresa">Nome da Empresa<span className="required-mark">*</span></label>
        <input
          type="text"
          id="nomeEmpresa"
          name="nomeEmpresa"
          className="form-input"
          value={formData.nomeEmpresa}
          onChange={handleInputChange}
          placeholder="Digite o nome completo da empresa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="nomeResponsavel">Nome do Responsável</label>
        <input
          type="text"
          id="nomeResponsavel"
          name="nomeResponsavel"
          className="form-input"
          value={formData.nomeResponsavel}
          onChange={handleInputChange}
          placeholder="Digite o nome completo do responsável"
        />
      </div>

      <div className="button-container">
        <div className="button-group">
          <button type="button" className="next-button" onClick={handleNext}>
            Próximo
            <span className="button-arrow">→</span>
          </button>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 2 - Dados Pessoais
  const renderPage2 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor="nome">Nome do Funcionário<span className="required-mark">*</span></label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="form-input"
          value={formData.nome}
          onChange={handleInputChange}
          placeholder="Digite o nome completo do funcionário"
        />
      </div>

      <div className="form-group">
        <label htmlFor="nomeMae">Nome da mãe<span className="required-mark">*</span></label>
        <input
          type="text"
          id="nomeMae"
          name="nomeMae"
          className="form-input"
          value={formData.nomeMae}
          onChange={handleInputChange}
          placeholder="Digite o nome completo da mãe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="nomePai">Nome do Pai</label>
        <input
          type="text"
          id="nomePai"
          name="nomePai"
          className="form-input"
          value={formData.nomePai}
          onChange={handleInputChange}
          placeholder="Digite o nome completo do pai"
        />
      </div>

      <div className="form-group">
        <label htmlFor="sexo">Sexo<span className="required-mark">*</span></label>
        <select
          id="sexo"
          name="sexo"
          className="form-input"
          value={formData.sexo}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email<span className="required-mark">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="exemplo@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          className="form-input"
          value={formData.telefone}
          onChange={handleInputChange}
          placeholder="(00) 0000-0000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="celular">Celular<span className="required-mark">*</span></label>
        <input
          type="tel"
          id="celular"
          name="celular"
          className="form-input"
          value={formData.celular}
          onChange={handleInputChange}
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataNascimento">Data de Nascimento<span className="required-mark">*</span></label>
        <input
          type="text"
          id="dataNascimento"
          name="dataNascimento"
          className="form-input"
          value={formData.dataNascimento}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>

      <div className="form-group">
        <label htmlFor="municipioNascimento">Município de Nascimento<span className="required-mark">*</span></label>
        <input
          type="text"
          id="municipioNascimento"
          name="municipioNascimento"
          className="form-input"
          value={formData.municipioNascimento}
          onChange={handleInputChange}
          placeholder="Digite o nome do município"
        />
      </div>

      <div className="form-group">
        <label htmlFor="estadoCivil">Estado Civil<span className="required-mark">*</span></label>
        <select
          id="estadoCivil"
          name="estadoCivil"
          className="form-input"
          value={formData.estadoCivil}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="solteiro">Solteiro(a)</option>
          <option value="casado">Casado(a)</option>
          <option value="divorciado">Divorciado(a)</option>
          <option value="viuvo">Viúvo(a)</option>
          <option value="separado">Separado(a)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="corPele">Cor da Pele<span className="required-mark">*</span></label>
        <select
          id="corPele"
          name="corPele"
          className="form-input"
          value={formData.corPele}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="branca">Branca</option>
          <option value="preta">Preta</option>
          <option value="parda">Parda</option>
          <option value="amarela">Amarela</option>
          <option value="indigena">Indígena</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="escolaridade">Escolaridade<span className="required-mark">*</span></label>
        <select
          id="escolaridade"
          name="escolaridade"
          className="form-input"
          value={formData.escolaridade}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="analfabeto">Analfabeto</option>
          <option value="ate_5_ano_incompleto">Até o 5º ano incompleto do Ensino Fundamental</option>
          <option value="5_ano_completo">5º ano completo do Ensino Fundamental</option>
          <option value="6_ao_9_ano_incompleto">Do 6º ao 9º ano do Ensino Fundamental incompleto</option>
          <option value="ensino_fundamental_completo">Ensino Fundamental completo</option>
          <option value="ensino_medio_incompleto">Ensino Médio incompleto</option>
          <option value="ensino_medio_completo">Ensino Médio completo</option>
          <option value="ensino_superior_incompleto">Ensino Superior incompleto</option>
          <option value="ensino_superior_completo">Ensino Superior completo</option>
          <option value="pos_graduacao">Pós Graduação</option>
          <option value="mestrado">Mestrado</option>
          <option value="doutorado">Doutorado</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF<span className="required-mark">*</span></label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          className="form-input"
          value={formData.cpf}
          onChange={handleInputChange}
          placeholder="000.000.000-00"
        />
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 3 - Documentos e Endereço
  const renderPage3 = () => (
    <>
      <div className="form-group">
        <label htmlFor="pis">PIS</label>
        <input
          type="text"
          id="pis"
          name="pis"
          className="form-input"
          value={formData.pis}
          onChange={handleInputChange}
          placeholder="000.00000.00-0"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="docIdentificacao">Documento de Identificação</label>
          <input
            type="text"
            id="docIdentificacao"
            name="docIdentificacao"
            className="form-input"
            value={formData.docIdentificacao}
            onChange={handleInputChange}
            placeholder="Digite o número do documento"
          />
        </div>
        <div className="form-group">
          <label htmlFor="orgaoExpeditor">Órgão Expedidor</label>
          <input
            type="text"
            id="orgaoExpeditor"
            name="orgaoExpeditor"
            className="form-input"
            value={formData.orgaoExpeditor}
            onChange={handleInputChange}
            placeholder="Ex: SSP, DETRAN"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataExpedicao">Data de Expedição</label>
          <input
            type="text"
            id="dataExpedicao"
            name="dataExpedicao"
            className="form-input"
            value={formData.dataExpedicao}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="carteiraTrabalho">Carteira de Trabalho</label>
          <input
            type="text"
            id="carteiraTrabalho"
            name="carteiraTrabalho"
            className="form-input"
            value={formData.carteiraTrabalho}
            onChange={handleInputChange}
            placeholder="0000000-0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataExpedicaoCT">Data de Expedição</label>
          <input
            type="text"
            id="dataExpedicaoCT"
            name="dataExpedicaoCT"
            className="form-input"
            value={formData.dataExpedicaoCT}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cnh">CNH (Nº)</label>
          <input
            type="text"
            id="cnh"
            name="cnh"
            className="form-input"
            value={formData.cnh}
            onChange={handleInputChange}
            placeholder="00000000000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoriaCNH">Categoria</label>
          <select
            id="categoriaCNH"
            name="categoriaCNH"
            className="form-input"
            value={formData.categoriaCNH}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="AB">AB</option>
            <option value="AC">AC</option>
            <option value="AD">AD</option>
            <option value="AE">AE</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dataExpedicaoCNH">Data de Expedição</label>
          <input
            type="text"
            id="dataExpedicaoCNH"
            name="dataExpedicaoCNH"
            className="form-input"
            value={formData.dataExpedicaoCNH}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataValidadeCNH">Data de Validade</label>
          <input
            type="text"
            id="dataValidadeCNH"
            name="dataValidadeCNH"
            className="form-input"
            value={formData.dataValidadeCNH}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataPrimeiraHabilitacao">Data da 1ª Habilitação</label>
          <input
            type="text"
            id="dataPrimeiraHabilitacao"
            name="dataPrimeiraHabilitacao"
            className="form-input"
            value={formData.dataPrimeiraHabilitacao}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tituloEleitor">Título de Eleitor</label>
        <input
          type="text"
          id="tituloEleitor"
          name="tituloEleitor"
          className="form-input"
          value={formData.tituloEleitor}
          onChange={handleInputChange}
          placeholder="000000000000"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="carteiraReservista">Carteira de Reservista (Nº)</label>
          <input
            type="text"
            id="carteiraReservista"
            name="carteiraReservista"
            className="form-input"
            value={formData.carteiraReservista}
            onChange={handleInputChange}
            placeholder="Digite o número da carteira"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataExpedicaoReservista">Data de Expedição</label>
          <input
            type="text"
            id="dataExpedicaoReservista"
            name="dataExpedicaoReservista"
            className="form-input"
            value={formData.dataExpedicaoReservista}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endereco">Endereço<span className="required-mark">*</span></label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          className="form-input"
          value={formData.endereco}
          onChange={handleInputChange}
          placeholder="Rua, Avenida, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="bairro">Bairro<span className="required-mark">*</span></label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          className="form-input"
          value={formData.bairro}
          onChange={handleInputChange}
          placeholder="Digite o bairro"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cidade">Cidade<span className="required-mark">*</span></label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            className="form-input"
            value={formData.cidade}
            onChange={handleInputChange}
            placeholder="Digite a cidade"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado<span className="required-mark">*</span></label>
          <select
            id="estado"
            name="estado"
            className="form-input"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cep">CEP<span className="required-mark">*</span></label>
        <input
          type="text"
          id="cep"
          name="cep"
          className="form-input"
          value={formData.cep}
          onChange={handleInputChange}
          placeholder="00000-000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          className="form-input"
          value={formData.observacoes}
          onChange={handleInputChange}
          rows={4}
          placeholder="Digite aqui suas observações"
        />
      </div>

      <div className="form-group">
        <label htmlFor="foto">Enviar foto para Registro</label>
        <input
          type="file"
          id="foto"
          name="foto"
          className="form-input"
          accept="image/*"
          onChange={handleInputChange}
        />
        <small className="file-info">Faça upload de 1 arquivo aceito. O tamanho máximo é de 10 MB</small>
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 4 - Dados Bancários
  const renderPage4 = () => (
    <>
      <div className="form-group">
        <label htmlFor="banco">Banco</label>
        <input
          type="text"
          id="banco"
          name="banco"
          className="form-input"
          value={formData.banco}
          onChange={handleInputChange}
          placeholder="Exemplo Bradesco"
        />
      </div>

      <div className="form-group">
        <label htmlFor="agenciaConta">Agência / Conta-Dígito</label>
        <input
          type="text"
          id="agenciaConta"
          name="agenciaConta"
          className="form-input"
          value={formData.agenciaConta}
          onChange={handleInputChange}
          placeholder="999/999999-9"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoConta">Tipo de Conta</label>
        <select
          id="tipoConta"
          name="tipoConta"
          className="form-input"
          value={formData.tipoConta}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="corrente">Conta Corrente</option>
          <option value="poupanca">Conta Poupança</option>
          <option value="salario">Conta Salário</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipoChavePix">Tipo de Chave PIX</label>
          <select
            id="tipoChavePix"
            name="tipoChavePix"
            className="form-input"
            value={formData.tipoChavePix}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="celular">Nº Celular</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="chavePix">Chave PIX</label>
          <input
            type="text"
            id="chavePix"
            name="chavePix"
            className="form-input"
            value={formData.chavePix}
            onChange={handleInputChange}
            placeholder={formData.tipoChavePix === 'cpf' ? '000.000.000-00' : 
                       formData.tipoChavePix === 'email' ? 'exemplo@email.com' : 
                       formData.tipoChavePix === 'celular' ? '(00) 00000-0000' : 
                       'Digite a chave PIX'}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="observacoesBancarias">Observações</label>
        <textarea
          id="observacoesBancarias"
          name="observacoesBancarias"
          className="form-input"
          value={formData.observacoesBancarias}
          onChange={handleInputChange}
          rows={4}
          placeholder="Digite aqui suas observações"
        />
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 5 - Dependentes
  const renderPage5 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label className="checkbox-label">
          Possui Dependentes para fins de Salário Família e/ou Dedução de IR?<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="possuiDependentes"
              checked={formData.possuiDependentes === true}
              onChange={() => setFormData(prev => ({ ...prev, possuiDependentes: true }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="possuiDependentes"
              checked={formData.possuiDependentes === false}
              onChange={() => {
                // Limpa os dados dos dependentes quando selecionar "Não"
                setFormData(prev => ({
                  ...prev,
                  possuiDependentes: false,
                  dependentes: [] // Limpa o array de dependentes
                }))
              }}
            />
            Não
          </label>
        </div>
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const renderDependentePage = (index: number) => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor={`dependenteNome${index}`}>Nome do Dependente<span className="required-mark">*</span></label>
        <input
          type="text"
          id={`dependenteNome${index}`}
          className="form-input"
          value={formData.dependentes[index]?.nome || ''}
          onChange={(e) => handleDependenteChange(index, 'nome', e.target.value)}
          placeholder="Digite o nome completo do dependente"
        />
      </div>

      <div className="form-group">
        <label htmlFor={`dependenteCpf${index}`}>CPF do Dependente<span className="required-mark">*</span></label>
        <input
          type="text"
          id={`dependenteCpf${index}`}
          className="form-input"
          value={formData.dependentes[index]?.cpf || ''}
          onChange={(e) => handleDependenteChange(index, 'cpf', e.target.value)}
          placeholder="000.000.000-00"
        />
      </div>

      <div className="form-group">
        <label htmlFor={`dependenteDataNascimento${index}`}>Data de Nascimento do Dependente<span className="required-mark">*</span></label>
        <input
          type="text"
          id={`dependenteDataNascimento${index}`}
          className="form-input"
          value={formData.dependentes[index]?.dataNascimento || ''}
          onChange={(e) => handleDependenteChange(index, 'dataNascimento', e.target.value)}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`dependenteUF${index}`}>UF de Nascimento<span className="required-mark">*</span></label>
          <select
            id={`dependenteUF${index}`}
            className="form-input"
            value={formData.dependentes[index]?.ufNascimento || ''}
            onChange={(e) => handleDependenteChange(index, 'ufNascimento', e.target.value)}
          >
            <option value="">Selecione</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.sigla} - {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`dependenteMunicipio${index}`}>Município de Nascimento<span className="required-mark">*</span></label>
          <input
            type="text"
            id={`dependenteMunicipio${index}`}
            className="form-input"
            value={formData.dependentes[index]?.municipioNascimento || ''}
            onChange={(e) => handleDependenteChange(index, 'municipioNascimento', e.target.value)}
            disabled={!formData.dependentes[index]?.ufNascimento}
            placeholder={formData.dependentes[index]?.ufNascimento ? "Digite o município" : "Selecione a UF primeiro"}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={`dependenteTipo${index}`}>Dependente para Salário Família e Imposto de Renda?<span className="required-mark">*</span></label>
        <select
          id={`dependenteTipo${index}`}
          className="form-input"
          value={formData.dependentes[index]?.tipoDependente || ''}
          onChange={(e) => handleDependenteChange(index, 'tipoDependente', e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="salario_familia">Sim - Somente salário família</option>
          <option value="imposto_renda">Sim - Somente para Imposto de Renda</option>
          <option value="ambos">Sim - Dependente de salário família e imposto de renda</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={`possuiOutroDependente${index}`}>Possui outro Dependentes para fins de Salário Família e/ou Dedução de IR?<span className="required-mark">*</span></label>
        <select
          id={`possuiOutroDependente${index}`}
          className="form-input"
          value={formData.dependentes[index]?.possuiOutroDependente || ''}
          onChange={(e) => handleDependenteChange(index, 'possuiOutroDependente', e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 8 - Dados do Cônjuge
  const validatePage8 = () => {
    const requiredFields = {
      nomeConjuge: 'Nome do Cônjuge',
      cpfConjuge: 'CPF do Cônjuge',
      dataNascimentoConjuge: 'Data de Nascimento do Cônjuge'
    }

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label)

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `Por favor, preencha os seguintes campos:<br><br>${emptyFields.join('<br>')}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#646cff'
      })
      return false
    }

    return true
  }

  // Página 8 - Dados do Cônjuge
  const renderPage8 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor="nomeConjuge">Nome Completo do Cônjuge<span className="required-mark">*</span></label>
        <input
          type="text"
          id="nomeConjuge"
          name="nomeConjuge"
          className="form-input"
          value={formData.nomeConjuge}
          onChange={handleInputChange}
          placeholder="Digite o nome completo do cônjuge"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cpfConjuge">CPF do Cônjuge<span className="required-mark">*</span></label>
        <input
          type="text"
          id="cpfConjuge"
          name="cpfConjuge"
          className="form-input"
          value={formData.cpfConjuge}
          onChange={handleInputChange}
          placeholder="000.000.000-00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataNascimentoConjuge">Data de Nascimento do Cônjuge<span className="required-mark">*</span></label>
        <input
          type="text"
          id="dataNascimentoConjuge"
          name="dataNascimentoConjuge"
          className="form-input"
          value={formData.dataNascimentoConjuge}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Nova página para informações do empregado
  const renderPage10 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor="cargoFuncao">Cargo/Função<span className="required-mark">*</span></label>
        <input
          type="text"
          id="cargoFuncao"
          name="cargoFuncao"
          className="form-input"
          value={formData.cargoFuncao}
          onChange={handleInputChange}
          placeholder="Digite o cargo ou função"
        />
      </div>

      <div className="form-group">
        <label htmlFor="salario">Salário</label>
        <input
          type="text"
          id="salario"
          name="salario"
          className="form-input"
          value={formData.salario}
          onChange={handleInputChange}
          placeholder="R$ 0,00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataAdmissao">Data de admissão<span className="required-mark">*</span></label>
        <input
          type="text"
          id="dataAdmissao"
          name="dataAdmissao"
          className="form-input"
          value={formData.dataAdmissao}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          Optante de vale transporte<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="optanteValeTransporte"
              value="Sim"
              checked={formData.optanteValeTransporte === 'Sim'}
              onChange={(e) => setFormData(prev => ({ ...prev, optanteValeTransporte: e.target.value }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="optanteValeTransporte"
              value="Não"
              checked={formData.optanteValeTransporte === 'Não'}
              onChange={(e) => setFormData(prev => ({ ...prev, optanteValeTransporte: e.target.value }))}
            />
            Não
          </label>
        </div>
      </div>

      {formData.optanteValeTransporte === 'Sim' && (
        <div className="form-group">
          <label htmlFor="valorPassagem">Valor da Passagem<span className="required-mark">*</span></label>
          <input
            type="text"
            id="valorPassagem"
            name="valorPassagem"
            className="form-input"
            value={formData.valorPassagem}
            onChange={handleInputChange}
            placeholder="R$ 0,00"
          />
        </div>
      )}

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Nova página para informações da empresa
  const renderPage11 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label htmlFor="nomeResponsavelPreenchimento">Nome do responsável pelo preenchimento<span className="required-mark">*</span></label>
        <input
          type="text"
          id="nomeResponsavelPreenchimento"
          name="nomeResponsavelPreenchimento"
          className="form-input"
          value={formData.nomeResponsavelPreenchimento}
          onChange={handleInputChange}
          placeholder="Nome de quem está preenchendo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cargoFuncao">Cargo/Função<span className="required-mark">*</span></label>
        <input
          type="text"
          id="cargoFuncao"
          name="cargoFuncao"
          className="form-input"
          value={formData.cargoFuncao}
          onChange={handleInputChange}
          placeholder="Digite o cargo ou função"
        />
      </div>

      <div className="form-group">
        <label htmlFor="salario">Salário<span className="required-mark">*</span></label>
        <input
          type="text"
          id="salario"
          name="salario"
          className="form-input"
          value={formData.salario}
          onChange={handleInputChange}
          placeholder="R$ 0,00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dataAdmissao">Data de admissão<span className="required-mark">*</span></label>
        <input
          type="text"
          id="dataAdmissao"
          name="dataAdmissao"
          className="form-input"
          value={formData.dataAdmissao}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>

      <div className="form-group">
        <label htmlFor="periodoExperiencia">Período de Experiência<span className="required-mark">*</span></label>
        <select
          id="periodoExperiencia"
          name="periodoExperiencia"
          className="form-input"
          value={formData.periodoExperiencia}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="30+0">30 + 0</option>
          <option value="45+0">45 + 0</option>
          <option value="30+30">30 + 30</option>
          <option value="45+45">45 + 45</option>
          <option value="30+60">30 + 60</option>
          <option value="60+30">60 + 30</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jornadaTrabalho">Jornada de Trabalho<span className="required-mark">*</span></label>
        <select
          id="jornadaTrabalho"
          name="jornadaTrabalho"
          className="form-input"
          value={formData.jornadaTrabalho}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="220_44">220 horas mensais e 44 horas semanais</option>
          <option value="200_40">200 horas mensais e 40 horas semanais</option>
          <option value="180_36">180 horas mensais e 36 horas semanais</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jornadaParcial">Jornada Parcial<span className="required-mark">*</span></label>
        <select
          id="jornadaParcial"
          name="jornadaParcial"
          className="form-input"
          value={formData.jornadaParcial}
          onChange={handleInputChange}
        >
          <option value="">Selecione</option>
          <option value="150_30">150 horas mensais e 30 horas semanais</option>
          <option value="130_26">130 horas mensais e 26 horas semanais</option>
          <option value="100_20">100 horas mensais e 20 horas semanais</option>
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          Adicional de Periculosidade<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="adicionalPericulosidade"
              value="Sim"
              checked={formData.adicionalPericulosidade === 'Sim'}
              onChange={(e) => setFormData(prev => ({ ...prev, adicionalPericulosidade: e.target.value }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="adicionalPericulosidade"
              value="Não"
              checked={formData.adicionalPericulosidade === 'Não'}
              onChange={(e) => setFormData(prev => ({ ...prev, adicionalPericulosidade: e.target.value }))}
            />
            Não
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          Adicional de Insalubridade<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="adicionalInsalubridade"
              value="Sim"
              checked={formData.adicionalInsalubridade === 'Sim'}
              onChange={(e) => setFormData(prev => ({ ...prev, adicionalInsalubridade: e.target.value }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="adicionalInsalubridade"
              value="Não"
              checked={formData.adicionalInsalubridade === 'Não'}
              onChange={(e) => setFormData(prev => ({ ...prev, adicionalInsalubridade: e.target.value }))}
            />
            Não
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          Optante de vale transporte<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="optanteValeTransporte"
              value="Sim"
              checked={formData.optanteValeTransporte === 'Sim'}
              onChange={(e) => setFormData(prev => ({ ...prev, optanteValeTransporte: e.target.value }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="optanteValeTransporte"
              value="Não"
              checked={formData.optanteValeTransporte === 'Não'}
              onChange={(e) => setFormData(prev => ({ ...prev, optanteValeTransporte: e.target.value }))}
            />
            Não
          </label>
        </div>
      </div>

      {formData.optanteValeTransporte === 'Sim' && (
        <>
          <div className="form-group">
            <label htmlFor="valorPassagem">Valor da Passagem<span className="required-mark">*</span></label>
            <input
              type="text"
              id="valorPassagem"
              name="valorPassagem"
              className="form-input"
              value={formData.valorPassagem}
              onChange={handleInputChange}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantidadePassagem">Quantidade de passagem por dia<span className="required-mark">*</span></label>
            <input
              type="text"
              id="quantidadePassagem"
              name="quantidadePassagem"
              className="form-input"
              value={formData.quantidadePassagem}
              onChange={handleInputChange}
              placeholder="Digite a quantidade"
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label className="checkbox-label">
          Vale Combustível<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="valeCombustivel"
              value="Sim"
              checked={formData.valeCombustivel === 'Sim'}
              onChange={(e) => setFormData(prev => ({ ...prev, valeCombustivel: e.target.value }))}
            />
            Sim
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="valeCombustivel"
              value="Não"
              checked={formData.valeCombustivel === 'Não'}
              onChange={(e) => setFormData(prev => ({ ...prev, valeCombustivel: e.target.value }))}
            />
            Não
          </label>
        </div>
      </div>

      {formData.valeCombustivel === 'Sim' && (
        <>
          <div className="form-group">
            <label htmlFor="valorValeCombustivel">Valor do vale Combustível<span className="required-mark">*</span></label>
            <input
              type="text"
              id="valorValeCombustivel"
              name="valorValeCombustivel"
              className="form-input"
              value={formData.valorValeCombustivel}
              onChange={handleInputChange}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoDescontoCombustivel">Tipo de desconto do Vale Combustível<span className="required-mark">*</span></label>
            <select
              id="tipoDescontoCombustivel"
              name="tipoDescontoCombustivel"
              className="form-input"
              value={formData.tipoDescontoCombustivel}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="valor">Valor em Reais</option>
              <option value="percentual">Percentual</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="valorDescontoCombustivel">Valor do desconto do Vale Combustível<span className="required-mark">*</span></label>
            <input
              type="text"
              id="valorDescontoCombustivel"
              name="valorDescontoCombustivel"
              className="form-input"
              value={formData.valorDescontoCombustivel}
              onChange={handleInputChange}
              placeholder={formData.tipoDescontoCombustivel === 'valor' ? 'R$ 0,00' : '0%'}
            />
          </div>
        </>
      )}

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </>
  )

  // Página 9 - Responsável pelo preenchimento
  const renderPage9 = () => (
    <>
      <p className="required-field">* Indica uma pergunta obrigatória</p>
      
      <div className="form-group">
        <label className="checkbox-label">
          Responsável pelo preenchimento do formulário:<span className="required-mark">*</span>
        </label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="radio"
              name="responsavelPreenchimento"
              value="Empregado"
              checked={formData.responsavelPreenchimento === 'Empregado'}
              onChange={(e) => {
                // Se mudar de Empresa para Empregado, limpa os dados específicos da empresa
                if (formData.responsavelPreenchimento === 'Empresa') {
                  setFormData(prev => ({
                    ...prev,
                    responsavelPreenchimento: e.target.value,
                    nomeResponsavelPreenchimento: '',
                    periodoExperiencia: '',
                    jornadaTrabalho: '',
                    jornadaParcial: '',
                    adicionalPericulosidade: '',
                    adicionalInsalubridade: '',
                    quantidadePassagem: '',
                    valeCombustivel: '',
                    valorValeCombustivel: '',
                    tipoDescontoCombustivel: '',
                    valorDescontoCombustivel: ''
                  }))
                } else {
                  setFormData(prev => ({ ...prev, responsavelPreenchimento: e.target.value }))
                }
              }}
            />
            Empregado
          </label>
          <label className="checkbox-option">
            <input
              type="radio"
              name="responsavelPreenchimento"
              value="Empresa"
              checked={formData.responsavelPreenchimento === 'Empresa'}
              onChange={(e) => {
                // Se mudar de Empregado para Empresa, limpa os dados específicos do empregado
                if (formData.responsavelPreenchimento === 'Empregado') {
                  setFormData(prev => ({
                    ...prev,
                    responsavelPreenchimento: e.target.value,
                    cargoFuncao: '',
                    salario: '',
                    dataAdmissao: '',
                    optanteValeTransporte: '',
                    valorPassagem: ''
                  }))
                } else {
                  setFormData(prev => ({ ...prev, responsavelPreenchimento: e.target.value }))
                }
              }}
            />
            Empresa
          </label>
        </div>
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  // Página 12 - Termos de Uso
  const renderPage12 = () => (
    <>
      <div className="terms-container">
        <div className="terms-content">
          <h2>Termos de Uso dos Dados</h2>
          <div className="terms-text">
            <h3>1 - DA AUTORIZAÇÃO</h3>
            <p>Por este instrumento, o qual visa registrar a manifestação livre e inequívoca pela qual o Titular concorda com o tratamento de seus dados pessoais e dos seus dependentes para finalidade específica, em conformidade com a Lei nº 13.709/2018.</p>
            
            <p>Assino o presente termo e concordo que G2C CONTABILIDADE LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 15.120.183/0001-56, doravante denominada Controladora, tome decisões referentes ao tratamento de seus dados pessoais, e, ainda, os dados necessários ao usufruto de serviços e benefícios ofertados por ela, bem como realize o tratamento de tais dados, envolvendo operações como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</p>

            <h3>2 - Dos Dados Pessoais</h3>
            <p>A Controladora fica autorizada a tomar decisões referentes ao tratamento e a realizar o tratamento dos seguintes dados pessoais do Titular:</p>
            <ul>
              <li>Nome completo</li>
              <li>Data de nascimento</li>
              <li>Número e imagem da Carteira de Identidade (RG)</li>
              <li>Número e imagem do Cadastro de Pessoas Físicas (CPF)</li>
              <li>Número e imagem da Carteira Nacional de Habilitação (CNH)</li>
              <li>Número do Cadastro Nacional de Pessoas Jurídicas (CNPJ)</li>
              <li>Fotografia 3x4</li>
              <li>Estado civil</li>
              <li>Nível de instrução ou escolaridade</li>
              <li>Endereço completo</li>
              <li>Números de telefone, WhatsApp e endereços de e-mail</li>
              <li>Banco, agência e número de contas bancárias</li>
              <li>Nome de usuário e senha específicos para uso dos serviços do Controlador</li>
              <li>Comunicação, verbal e escrita, mantida entre o Titular e o Controlador</li>
            </ul>

            <h3>3 - Finalidades do Tratamento dos Dados</h3>
            <p>O tratamento dos dados pessoais listados nestes termos tem as seguintes finalidades:</p>
            <ul>
              <li>Possibilitar que a Controladora identifique e entre em contato com o Titular para fins de relacionamento trabalhista</li>
              <li>Possibilitar que a Controladora elabore contrato de trabalho</li>
              <li>Possibilitar que a Controladora envie ao Titular a remuneração pactuada</li>
              <li>Possibilitar que a Controladora utilize tais dados em Pesquisas de Mercado</li>
              <li>Possibilitar que a Controladora utilize tais dados na inscrição, divulgação, premiação dos colaboradores</li>
              <li>Possibilitar que a Controladora utilize tais dados na elaboração de relatórios</li>
              <li>Possibilitar que a Controladora utilize tais dados para suas peças de Comunicação</li>
              <li>Possibilitar que a Controladora utilize tais dados para fins fiscais, sociais, previdenciários e trabalhistas</li>
              <li>Possibilitar que a Controladora utilize tais dados para manter banco de dados de profissionais do mercado para facilitar o contato em futuros convites para eventos</li>
            </ul>

            <h3>4 - Compartilhamento de Dados com outros Setores da Controladora</h3>
            <p>A Controladora fica autorizada a compartilhar os dados pessoais do Titular com outros agentes de tratamento de dados, caso seja necessário para as finalidades listadas neste termo, observados os princípios e as garantias estabelecidas pela Lei nº 13.709/2018.</p>

            <h3>5 - Compartilhamento de Dados com Terceiros</h3>
            <p>A controladora fica autorizada a compartilhar os dados pessoais do Titular com empresas terceirizadas que prestam serviços a ela e que são relacionados ao cumprimento da atividade-fim desta autorização.</p>
            <p>Dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.</p>

            <h3>6 - Término do Tratamento dos Dados</h3>
            <p>A Controladora poderá manter e tratar os dados pessoais do Titular durante todo o período em que os mesmos forem pertinentes ao alcance das finalidades listadas neste termo. Dados pessoais anonimizados, sem possibilidade de associação ao indivíduo, poderão ser mantidos por período indefinido.</p>
            <p>O Titular poderá solicitar via e-mail ou correspondência ao Controlador, a qualquer momento, que sejam eliminados os dados pessoais não anonimizados.</p>
            <p>O Titular fica ciente de que poderá ser inviável ao Controlador continuar a relação de emprego a partir da eliminação dos dados pessoais.</p>

            <h3>7 - Direito de Revogação do Consentimento</h3>
            <p>Este consentimento poderá ser revogado pelo Titular, a qualquer momento, mediante solicitação via e-mail ou correspondência, observadas as obrigações legais ou regulatórias a serem cumpridas pela Controladora, na forma do art. 7, inc II, Lei 13.709/2018.</p>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="radio"
                name="concordaTermos"
                checked={formData.concordaTermos}
                onChange={() => setFormData(prev => ({ ...prev, concordaTermos: true }))}
              />
              Li e concordo com os termos de uso
            </label>
          </div>

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <label className="checkbox-label">Quanto as informações prestadas</label>
            <div className="checkbox-group" style={{ marginTop: '0.5rem' }}>
              <label className="checkbox-option">
                <input
                  type="radio"
                  name="declaraInformacoes"
                  checked={formData.declaraInformacoes}
                  onChange={() => setFormData(prev => ({ ...prev, declaraInformacoes: true }))}
                />
                Declaro que as informações acima prestadas são verdadeiras, e assumo a inteira responsabilidade pelas mesmas.
              </label>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <label htmlFor="documentoIdentidade">Adicione Foto legível do documento de Identidade, frente e verso.</label>
            <input
              type="file"
              id="documentoIdentidade"
              name="documentoIdentidade"
              className="form-input"
              accept="image/*"
              onChange={handleInputChange}
            />
            <small className="file-info">Faça upload de 1 arquivo aceito. O tamanho máximo é de 10 MB.</small>
          </div>
        </div>
      </div>

      <div className="button-container">
        <div className="button-group">
          <div className="button-group-left">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Voltar
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Próximo
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  // Página 13 - Confirmação de Envio
  const renderPage13 = () => {
    const handleSubmit = async () => {
      try {
        // Preparar os anexos
        const attachments = [];
        if (formData.foto) {
          attachments.push({
            filename: formData.foto.name,
            content: await readFileAsBase64(formData.foto)
          });
        }
        if (formData.documentoIdentidade) {
          attachments.push({
            filename: formData.documentoIdentidade.name,
            content: await readFileAsBase64(formData.documentoIdentidade)
          });
        }

        // Configuração do EmailJS para o email da empresa
        const templateParams = {
          from_name: formData.nome,
          to_name: 'G2C Contabilidade',
          to_email: 'rh@g2ccontabilidade.com.br',
          nome_empresa: formData.nomeEmpresa,
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          telefone: formData.telefone,
          celular: formData.celular,
          data_nascimento: formData.dataNascimento,
          endereco: formData.endereco,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          cargo: formData.cargoFuncao,
          salario: formData.salario,
          data_admissao: formData.dataAdmissao,
          optante_vt: formData.optanteValeTransporte,
          valor_passagem: formData.valorPassagem,
          banco: formData.banco,
          agencia_conta: formData.agenciaConta,
          tipo_conta: formData.tipoConta,
          dependentes: JSON.stringify(formData.dependentes),
          responsavel_preenchimento: formData.responsavelPreenchimento,
          data_envio: new Date().toLocaleDateString('pt-BR')
        }

        // Envio do email para a empresa (com os dados do formulário)
        await emailjs.send(
          'service_aijwjgr',
          'template_c83pm1p',
          templateParams,
          'JPlvEwQI87vaofEIx'
        )

        // Configuração do EmailJS para o email de confirmação do usuário
        const confirmationParams = {
          to_email: formData.email,
          to_name: formData.nome,
          company_name: 'G2C Contabilidade',
          website_link: 'https://g2ccontabilidade.com.br'
        }

        // Envio do email de confirmação para o usuário
        await emailjs.send(
          'service_aijwjgr',
          'template_um1kuwr',
          confirmationParams,
          'JPlvEwQI87vaofEIx'
        )

        Swal.fire({
          title: 'Formulário Enviado!',
          html: 'Suas respostas foram enviadas com sucesso.<br>Verifique sua caixa de entrada.',
          icon: 'success',
          confirmButtonColor: '#646cff'
        })
      } catch (error: unknown) {
        let errorMessage = 'Erro desconhecido ao enviar formulário';
        
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        console.error('Erro ao enviar formulário:', errorMessage);
        
        Swal.fire({
          title: 'Erro ao Enviar',
          text: `Ocorreu um erro ao enviar o formulário: ${errorMessage}. Por favor, tente novamente.`,
          icon: 'error',
          confirmButtonColor: '#646cff'
        });
      }
    }

    return (
      <>
        <div className="form-group" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Deseja enviar as respostas do formulário?
          </h2>
        </div>

        <div className="button-container">
          <div className="button-group">
            <button 
              type="button" 
              className="back-button" 
              onClick={handleBack}
            >
              <span style={{ fontSize: '1.2rem' }}>←</span>
              Não, Revisar Respostas
            </button>
            <button 
              type="button" 
              className="next-button" 
              onClick={handleSubmit}
            >
              Enviar Respostas
            </button>
          </div>
        </div>
      </>
    )
  }

  // Função auxiliar para converter arquivo em base64
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove o prefixo "data:image/jpeg;base64," do resultado
        const base64 = base64String.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={logo} alt="G2C Logo" className="company-logo" />
      </div>
      <h1 className="form-title">FICHA PARA ADMISSÃO DE EMPREGADOS</h1>
      <div className="form-container">
        <form className="admission-form">
          {currentPage === 1 && renderPage1()}
          {currentPage === 2 && renderPage2()}
          {currentPage === 3 && renderPage3()}
          {currentPage === 4 && renderPage4()}
          {currentPage === 5 && renderPage5()}
          {currentPage >= 6 && currentPage < 8 && renderDependentePage(currentPage - 6)}
          {currentPage === 8 && renderPage8()}
          {currentPage === 9 && renderPage9()}
          {currentPage === 10 && renderPage10()}
          {currentPage === 11 && renderPage11()}
          {currentPage === 12 && renderPage12()}
          {currentPage === 13 && renderPage13()}
        </form>
      </div>
      <footer className="footer">
        <p className="footer-text">Este formulário foi criado por G2C Contabilidade</p>
        <p className="footer-text">Todos os Direitos reservados</p>
        <img src={logo} alt="G2C Logo" className="footer-logo" />
      </footer>
    </div>
  )
}

export default App
