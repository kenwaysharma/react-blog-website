import React from 'react';

const RecentReducer = (state, action) => {
    
        return {
            ...state,
            postR: action.payload
          };
    
  };

export default RecentReducer
