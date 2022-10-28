const getRandomNumbers = (cant) => {
    console.log(parseInt(cant))
  let qty;
  if (typeof(parseInt(cant)) != 'number' || isNaN(parseInt(cant))) qty = 100000;
  else qty = cant;

  const result = {}

  for (let i = 0; i < qty; i++){
    let randomNumber  = Math.round(Math.random() * 1000)
    result[randomNumber] ? result[randomNumber] += 1 : result[randomNumber] = 1
  }

  return result
};

export default getRandomNumbers;