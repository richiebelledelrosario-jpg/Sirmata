function toggleMenu() {
      document.querySelector(".nav-links").classList.toggle("active");
    }

    document.querySelectorAll('#faq button').forEach(btn => {                       /*sini-select nito yung all id with faq and the buttons of it */
    btn.addEventListener('click', () => {                                           /*Here  naman sa forEach nag lo-loop na for every button (btn = individual button) */
      const question = btn.parentElement;                                           /*Tinatawag ntin yung parent element(tawag sa nagko-contain nung button). */
      const ans = question.querySelector('.ans');                                   /*Searches inside the .question, and then finds the element with class .ans */
      const isOpen = question.classList.contains('open');                           /*ina-access nya yung class list, then checks if it is open*/
      document.querySelectorAll('.question').forEach(i => { i.classList.remove('open');
      i.querySelector('.ans').style.maxHeight = null; });                           /*This  part nmn enables to close the tab    */
      if (!isOpen) { question.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });
  
