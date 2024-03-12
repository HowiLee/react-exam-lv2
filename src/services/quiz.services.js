export const getCategory = () => {
  return fetch("https://opentdb.com/api_category.php");
};

export const getQuestions = (category, difficulty) => {
  return fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
  );
};
