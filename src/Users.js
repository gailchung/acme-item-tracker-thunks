import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { createUser, deleteUser, removeThingFromUser } from './store'


const Users = ({ users, createUser, deleteUser, things, removeThingFromUser, increment, decrement })=> {
  return (
    <div>
      <h1>Users</h1>
      
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name } ({user.ranking})
                <button onClick={ ()=> deleteUser(user)}>x</button>
                <button onClick={()=> increment(user, 1)}>+</button>
                <button onClick={()=> decrement(user, -1)}>-</button>

      <ul>
        {
          things.filter( thing => thing.userId === user.id)
            .map(thing => {
              return (
                <li key={ thing.id }>
                  { thing.name } 
                  <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                </li>
              );
            }) 
        }
      </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things,
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: ()=> {
      dispatch(createUser());
      //hint
      //dispatch(createUser({name: Math.random()}));
    },
    removeThingFromUser: (thing)=> {
      dispatch(removeThingFromUser(thing))
    },
    deleteUser: (user)=> {
      dispatch(deleteUser(user));
    },
    increment: async(user, dir)=> {
      user = {...user, ranking: user.ranking + dir};
      await axios.put(`/api/users/${user.id}`, user);
      dispatch({type: 'UPDATE_USER', user});
    },
    decrement: async(user, dir)=> {
    user = {...user, ranking: user.ranking + dir};
    await axios.put(`/api/users/${user.id}`, user);
    dispatch({type: 'UPDATE_USER', user});
    } 
  }
}

export default connect(mapStateToProps, mapDispatch)(Users);
