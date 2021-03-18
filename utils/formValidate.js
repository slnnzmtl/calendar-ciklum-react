export default async function formValidate(object, isHandle) {
  let clone = Object.assign(object);

  Object.entries(object).map(([key, value]) => {
    clone[key] = validator[key](value, isHandle)
  })

  return await clone;
};

const validName = (data, isHandle) => {

  if (data !== false) {

    if (!data || data === "") {
      return { message: "Name cannot be empty!", result: true };
    } else {
      return { message: "Good", result: false };
    }
  } else {
    if (isHandle) {
      return { message: "Name cannot be empty!", result: true };
    } else {
      return { message: "Good", result: false };
    }
  }
};

const validParticipants = (data = [], isHandle) => {

  console.log(data)

  if (!data || !data.length) {
    return { message: "Participants cannot be empty", result: true };
  } else {
    return { message: "Good", result: false };
  }  
}

const validDay = (data, isHandle) => {
  if (!data || data === "") {
    return { message: "Please, select the day", result: true };
  } else {
    return { message: "Good", result: false };
  }  
}

const validTime = (data, isHandle) => {
  if (!data || data === "") {
    return { message: "Please, select the time", result: true };
  } else {
    return { message: "Good", result: false };
  }  
}

let validator = {
  name: validName,
  participants: validParticipants,
  day: validDay,
  time: validTime
};

const isObject = (val) => {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}