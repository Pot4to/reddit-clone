const feedView = view => ({ 
    type: "CHANGE-VIEW", 
    payload: 'feed'
});

const userView = view => ({ 
    type: "CHANGE-VIEW", 
    payload: 'user'
});

const newView = view => ({ 
    type: "CHANGE-VIEW", 
    payload: 'new'
});

export { feedView, userView, newView}