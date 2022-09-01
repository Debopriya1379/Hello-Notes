import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import TopicSliceReducer from './features/topicSlice';
import subjectSliceReducer from './features/subjectSlice';
import noteSliceReducer from './features/noteSlice';

const store = configureStore({
    reducer: {
      CurrTopic : TopicSliceReducer,
      CurrSubject : subjectSliceReducer,
      CurrNote : noteSliceReducer
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);


