import React, { useState, useEffect } from 'react'

export const useFilterArray = (data, colRef, filterRef) => {
  return data.filter(e => e[colRef] == filterRef)
}
