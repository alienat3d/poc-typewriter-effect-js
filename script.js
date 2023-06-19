const printFunc = () => {
  // Получаем доступ к элементу внутри функции "print".
  const letters = document.querySelectorAll('.print');
  const dogSnoreLetters = document.querySelectorAll('b');
  // Получаем в переменную текст из элемента на странице и чистим его на самой странице.
  const print = (element) => {
    // Если несколько первых символов являются пустой строкой, то можно применить метод trim(), чтобы от них избавится.
    // Также, чтобы избавится от бага с пробелами внутри строки из-за переноса, используем replace().
    const text = element.textContent.replace(/\s+/g, ' ').trim();
    // Создадим настройки через data-атрибут в вёрстке, чтобы можно было гибко настраивать нашу анимацию появления букв. Например задержку "delay".
    const startDelay = element.dataset.startDelay || 0;
    const delay = element.dataset.delay || 2000;
    const removeDelay = element.dataset.removeDelay || 3000;
    const typingSpeed = element.dataset.typingSpeed || 100;
    const deletingSpeed = element.dataset.removeSpeed || 50;

    let count = 0;
    let newText = '';

    element.textContent = '';

    const addPrint = () => {
      let interval;
      // Выводим каждую букву по-очереди с небольшим интервалом, имитируя печатную машинку.
      // Чтобы остановить наш интервальный счётчик после того, как будут написаны все буквы, сперва создадим специальную переменную, куда будем заносить наш интервал, точнее нас интересует его индекс. Он перестанет свою работу, когда закончится строка, которую он печатает.
      interval = setInterval(() => {
        // Каждую итерацию нашего интервала будем прибавлять к новой строке каждый очередной символ, пользуясь аккумулятором.
        newText += text[count];
        element.textContent = newText;
        count++;

        if (count === text.length) {
          clearInterval(interval); // Внутрь передаём ID интервала.
          // Вызываем с небольшой задержкой removePrint() по окончанию addPrint().
          setTimeout(removePrint, removeDelay);
        }
      }, typingSpeed);
    };
    // Теперь напишем вторую функцию, которая будет удалять текст в обратную сторону.
    const removePrint = () => {
      let interval;

      interval = setInterval(() => {
        // Проверим сперва newText на присутствие и уже потом выполняем действия удаления.
        if (newText.length) {
          newText = newText.slice(0, -1); // Будет удалять по одному символу от нашей строки.
          element.textContent = newText; // Записываем в textContent элемента.
          count--;
        } else {
          clearInterval(interval);

          setTimeout(addPrint, delay);
        }
      }, deletingSpeed);
    };
    // Немного оптимизируем код, заменив это...
    // setTimeout(() => {
    //   addPrint();
    // }, startDelay);
    // ...на это:
    setTimeout(addPrint, startDelay);
  };

  // Перебираем все элементы с классом "print" и применяем к каждому из них какую-то логику.
  letters.forEach((element) => print(element));

  dogSnoreLetters.forEach(function (element) {
    setInterval(() => {
      element.classList.toggle('hide');
    }, 1000);
  });
};

printFunc();
