import React, { createContext, useState, useEffect, useCallback } from "react";

import { userAPI } from '../api';

import { showToast } from '../utils';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.getAllUsers();
      // console.log(response.data.data);
      setUsers(response.data.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const response = await userAPI.getUser(userId);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: response.data.data,
      }));
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const addNewUser = async (user) => {
    setIsLoading(true);
    try {
      const response = await userAPI.addUser(user);
      handleSuccess('user added successfully');
      return response.data.id;
    } catch (err) {
      showToast('An error occurred while adding the user', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (user) => {
    setIsLoading(true);
    try {
      await userAPI.updateUser(user, user.id);
      handleSuccess('User updated successfully');
    } catch (err) {
      showToast('An error occurred while updating the user', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = async (id) => {
    setIsLoading(true);
    try {
      await userAPI.deleteUser(id);
      handleSuccess('User deleted successfully');
    } catch (err) {
      showToast('An error occurred while deleting the user', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchUsers();
    showToast(message);
  }  

  return (
    <UserContext.Provider
      value={{
        user,
        currentUser,
        isLoading,
        fetchUser,
        addNewUser,
        editUser,
        removeUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};