const getErrors = (error: any) => {
  let errors: any[] = [];
  const errorObject = error.response.data.errors;

  if (errorObject) {
    Object.keys(errorObject).map((item) => {
      const content = {
        type: item,
        message: errorObject[item][0],
      };
      errors.push(content);
    });
  } else {
    errors = [];
  }

  return errors;
};

export default getErrors;
