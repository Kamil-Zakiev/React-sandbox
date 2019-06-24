const middlewareA = store => next => action => {
    console.log('middlewareA: before calling a chain')
    const id = setTimeout(() => {        
        next(action);
        console.log('middlewareA: after calling a chain')
    }, 100);
    
    return () => clearTimeout(id);
};

export default middlewareA;