import React from 'react'
import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

export const fetchServices = async(id) => {
   
     return await db.collection("Services").where("CompanyID", "==", id).get()

  }

export const fetchOrders = async(id) => {
   
     return await db.collection("Orders").where("CompanyID", "==", id).get()

  }

export const fetchTickets = async(id) => {
   
     return await db.collection("Tickets").where("CompanyID", "==", id).get()

  }

export const fetchAccounts = async(id) => {
   
     return await db.collection("Accounts").where("CompanyID", "==", id).get()

  }

export const fetchLocations = async(id) => {
   
     return await db.collection("Locations").where("CompanyID", "==", id).get()

  }

export const fetchUsers = async(id) => {
   
     return await db.collection("Users").where("CompanyID", "==", id).get()

  }

export const fetchContracts = async(id) => {
   
     return await db.collection("Contracts").where("CompanyID", "==", id).get()

  }






