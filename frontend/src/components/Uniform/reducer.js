const emptyState = [];



let validateData = (uniform) => {

  if(uniform.name.length < 1) { throw new Error('No uniform name')};
  if(uniform.description.length < 1) {throw new Error('No description given')};
}


export default (state=emptyState, {type, payload}) => {
  switch (type) {

    case "INIT":
     return payload || emptyState;

    case "UNIFORM_ADD":
     validateData(payload);
     return [...state, payload];

    case "UNIFORM_UPDATE":
     validateData(payload);
     return state.map(item => item.id === payload.id ? payload : item );

    case "UNIFORM_DESTROY":
     return state.filter(item => item.id !== payload)

    default:
        return state;
  }
};
