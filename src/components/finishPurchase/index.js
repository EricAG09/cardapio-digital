export const finishPurchase = (cart) => {
  if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
  }

  // Formata o pedido
  const pedido = cart
      .map(
          (item) => `**${item.quantity}x** - **${item.name}** - R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join('%0A'); 

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const mensagem = `Novo pedido realizado:%0A%0A${pedido}%0A%0A*Total:* R$${total.toFixed(2)}`;

  // Gera o link para WhatsApp
  const linkWhatsApp = `https://wa.me/5585994066861?text=${mensagem}`;

  // Abre o link no WhatsApp
  window.open(linkWhatsApp, '_blank');
};