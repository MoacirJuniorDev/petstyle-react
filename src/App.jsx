import { useState, useEffect } from 'react';
import { ProdutoCard } from './components/ProdutoCard';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Agrupa os dados do formulário controlado num único state
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem: ''
  });

  // Simula a busca de dados numa API externa ao montar o componente
  useEffect(() => {
    const fetchProdutos = () => {
      setTimeout(() => {
        setProdutos([
          { id: 1, nome: 'Ração Premier 15kg', preco: 189.90, descricao: 'Ração super premium para cães adultos.', imagem: '' },
          { id: 2, nome: 'Arranhador Torre', preco: 120.00, descricao: 'Arranhador de sisal com 3 andares.', imagem: '' }
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchProdutos();
  }, []);

  // Lida com a digitação em qualquer input dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const novoProduto = {
      id: Date.now(), // Gera um ID único simples baseado no timestamp
      ...form
    };

    // Atualiza a lista imutavelmente e limpa o formulário
    setProdutos([...produtos, novoProduto]);
    setForm({ nome: '', preco: '', descricao: '', imagem: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>Catálogo de Produtos</h1>
      </header>

      <main>
        <section className="form-section">
          <h2>Cadastrar Novo Produto</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="nome" 
              placeholder="Nome do produto" 
              value={form.nome} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="preco" 
              step="0.01" 
              placeholder="Preço (Ex: 99.90)" 
              value={form.preco} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="descricao" 
              placeholder="Descrição curta" 
              value={form.descricao} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="imagem" 
              placeholder="URL da Imagem (opcional)" 
              value={form.imagem} 
              onChange={handleChange} 
            />
            <button type="submit">Adicionar Produto</button>
          </form>
        </section>

        <section className="produtos-section">
          <h2>Nossos Produtos</h2>
          {loading ? (
            <p className="loading">A carregar produtos...</p>
          ) : (
            <div className="grid-produtos">
              {produtos.map((produto) => (
                <ProdutoCard 
                  key={produto.id} 
                  nome={produto.nome} 
                  preco={produto.preco}
                  descricao={produto.descricao} 
                  imagem={produto.imagem} 
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;