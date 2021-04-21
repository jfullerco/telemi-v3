import React, {useState} from 'react'
import http from './http-common'

const getSite = async (id) => {

  return await http.get(`/rest/sites/${id}?metafields=true&fetchchildren=true`)

}

const postSite = async (id, data) => {

  return await http.post(`/rest/sites`, data)

}

const putSite = async (id, data) => {

  return await http.put(`/rest/sites/${id}`, data)

}

const delSite = async (id) => {

  return await http.delete(`/rest/sites/${id}`)

}

const postAsset = async (clientID, data) => {

  return await http.post(`/rest/clients/${clientID}/assets`, data)

}

export default {getSite, postSite, putSite, delSite, postAsset}