const middlewareB = store => next => action => {
    console.log('middlewareB: before calling a chain')
    const result = next(action);
    console.log('middlewareB: after calling a chain')
    return result;
};

export default middlewareB;