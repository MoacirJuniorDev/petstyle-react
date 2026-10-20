// Renderiza o card isolado recebendo os dados via props
export function ProdutoCard({ nome, preco, imagem, descricao }) {
  return (
    <div className="card">
      <img src={imagem || 'https://via.placeholder.com/150'} alt={nome} />
      <div className="card-info">
        <h3>{nome}</h3>
        {/* Garante a formatação do preço com duas casas decimais */}
        <p className="preco">R$ {Number(preco).toFixed(2).replace('.', ',')}</p>
        <p className="descricao">{descricao}</p>
      </div>
    </div>
  );
}