import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import './App.css'
import logo from './assets/G2C_logo_azul.png'
import Swal from 'sweetalert2'

interface Dependente {
  nome: string;
  cpf: string;
  dataNascimento: string;
  municipioNascimento: string;
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
}

function App() {
  const [currentPage, setCurrentPage] = useState(1)
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
    dataNascimentoConjuge: ''
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
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
        !dependente?.municipioNascimento || !dependente?.tipoDependente || 
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

  const handleNext = () => {
    if (currentPage === 1 && !validatePage1()) return
    if (currentPage === 2 && !validatePage2()) return
    if (currentPage === 3 && !validatePage3()) return
    if (currentPage === 4 && !validatePage4()) return
    if (currentPage === 5 && !validatePage5()) return
    if (currentPage >= 6 && !validateDependentePage(currentPage - 6)) return

    // Lógica para determinar a próxima página
    if (currentPage === 5) {
      if (formData.possuiDependentes === true) {
        // Inicializa o primeiro dependente
        const novosDependentes = [{
          nome: '',
          cpf: '',
          dataNascimento: '',
          municipioNascimento: '',
          tipoDependente: '',
          possuiOutroDependente: ''
        }]
        setFormData(prev => ({ ...prev, dependentes: novosDependentes }))
        setCurrentPage(6) // Página do primeiro dependente
      } else if (formData.possuiDependentes === false) {
        setCurrentPage(8) // Página do cônjuge
      }
    } else if (currentPage >= 6) {
      const dependenteAtual = formData.dependentes[currentPage - 6]
      if (dependenteAtual?.possuiOutroDependente === 'Sim') {
        // Cria uma nova página de dependente
        const novosDependentes = [...formData.dependentes]
        novosDependentes[currentPage - 5] = {
          nome: '',
          cpf: '',
          dataNascimento: '',
          municipioNascimento: '',
          tipoDependente: '',
          possuiOutroDependente: ''
        }
        setFormData(prev => ({ ...prev, dependentes: novosDependentes }))
        setCurrentPage(currentPage + 1)
      } else {
        setCurrentPage(8) // Página do cônjuge
      }
    } else {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentPage > 1) {
      if (currentPage === 8) {
        // Se estiver na página do cônjuge, volta para a última página de dependente ou página 5
        if (formData.possuiDependentes) {
          setCurrentPage(6 + formData.dependentes.length - 1)
        } else {
          setCurrentPage(5)
        }
      } else if (currentPage >= 6) {
        // Se estiver em uma página de dependente, volta para a página anterior
        setCurrentPage(prev => prev - 1)
      } else {
        // Para outras páginas, volta normalmente
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
          dataNascimentoConjuge: ''
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
        tipoDependente: '',
        possuiOutroDependente: ''
      }
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
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          className="form-input"
          value={formData.dataNascimento}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
        />
      </div>

      <div className="form-group">
        <label htmlFor="municipioNascimento">Município de Nascimento<span className="required-mark">*</span></label>
        <select
          id="municipioNascimento"
          name="municipioNascimento"
          className="form-input"
          value={formData.municipioNascimento}
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
            type="date"
            id="dataExpedicao"
            name="dataExpedicao"
            className="form-input"
            value={formData.dataExpedicao}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
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
            type="date"
            id="dataExpedicaoCT"
            name="dataExpedicaoCT"
            className="form-input"
            value={formData.dataExpedicaoCT}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
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
            type="date"
            id="dataExpedicaoCNH"
            name="dataExpedicaoCNH"
            className="form-input"
            value={formData.dataExpedicaoCNH}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataValidadeCNH">Data de Validade</label>
          <input
            type="date"
            id="dataValidadeCNH"
            name="dataValidadeCNH"
            className="form-input"
            value={formData.dataValidadeCNH}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataPrimeiraHabilitacao">Data da 1ª Habilitação</label>
          <input
            type="date"
            id="dataPrimeiraHabilitacao"
            name="dataPrimeiraHabilitacao"
            className="form-input"
            value={formData.dataPrimeiraHabilitacao}
            onChange={handleInputChange}
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
            type="date"
            id="dataExpedicaoReservista"
            name="dataExpedicaoReservista"
            className="form-input"
            value={formData.dataExpedicaoReservista}
            onChange={handleInputChange}
            placeholder="DD/MM/AAAA"
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
              onChange={() => setFormData(prev => ({ ...prev, possuiDependentes: false }))}
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
          type="date"
          id={`dependenteDataNascimento${index}`}
          className="form-input"
          value={formData.dependentes[index]?.dataNascimento || ''}
          onChange={(e) => handleDependenteChange(index, 'dataNascimento', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor={`dependenteMunicipio${index}`}>Município/UF de Nascimento do Dependente<span className="required-mark">*</span></label>
        <input
          type="text"
          id={`dependenteMunicipio${index}`}
          className="form-input"
          value={formData.dependentes[index]?.municipioNascimento || ''}
          onChange={(e) => handleDependenteChange(index, 'municipioNascimento', e.target.value)}
          placeholder="Digite o município e UF de nascimento"
        />
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
        </div>
      </div>
    </>
  )

  // Página 8 - Dados do Cônjuge
  const renderPage8 = () => (
    <>
      <div className="form-group">
        <label htmlFor="nomeConjuge">Nome Completo do Cônjuge</label>
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
        <label htmlFor="cpfConjuge">CPF do Cônjuge</label>
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
        <label htmlFor="dataNascimentoConjuge">Data de Nascimento do Cônjuge</label>
        <input
          type="date"
          id="dataNascimentoConjuge"
          name="dataNascimentoConjuge"
          className="form-input"
          value={formData.dataNascimentoConjuge}
          onChange={handleInputChange}
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
