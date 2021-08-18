import React, { useState, useEffect } from 'react';

const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
  DEFAULT: 'DEFAULT'
}

async function fetchData() {
  const res = await fetch('https://randomuser.me/api/?results=20');
  const data = await res.json();
  return data.results;
}

function fattenedLocation(locations) {
  const location = locations[0];
  const headers = extraLocationKey(location);
  const data = [];
  for(const { street, coordinates, timezone, ...rest } of locations) {
    data.push({
      ...rest,
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description: timezone.description,
      offset: timezone.offset
    })
  }
  return {
    headers,
    data
  }
}

function extraLocationKey(location) {
  let objectKeys = []; 
  Object.keys(location).forEach(locationKey => {
    const value = location[locationKey]
    if(typeof value !== 'object') {
      objectKeys.push(locationKey)
    } else {
      objectKeys = [...objectKeys, ...extraLocationKey(value)]
    }
  })
  return objectKeys
}

function PureTable() {
  const [userLocation, setUserLocation] = useState({
    headers: [],
    data: []
  });
  const [sortDirection, setSortDirection] = useState({});
  const [textHeader, setTextHeader] = useState('');

  useEffect(() => {
    fetchData().then(res => {
      const locations = res.map(user => user.location)
      const { headers, data } = fattenedLocation(locations)
      setUserLocation({
        headers,
        data
      })

      // set sorting
      const sortingDirection = {};
      for(const header of headers) {
        sortingDirection[header] = DIRECTION.DEFAULT;
      }
      setSortDirection(sortingDirection)
    })
  }, []);

  function sortColumn(sortKey) {
    const newLocations = {
      ...userLocation,
      data: [...userLocation.data]
    }
    const currentDirection = sortDirection[sortKey];
    newLocations.data.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if(currentDirection === DIRECTION.DEFAULT || currentDirection === DIRECTION.ASC) {
        if(valueA < valueB) return -1;
        if(valueA > valueB) return 1;
        return 0; 
      } else {
        if(valueA > valueB) return -1;
        if(valueA < valueB) return 1;
        return 0; 
      }
    })

    const nextSortDirection = (currentDirection === DIRECTION.DEFAULT || currentDirection === DIRECTION.ASC) ? DIRECTION.DESC : DIRECTION.ASC;

    const newSortDirection = {...sortDirection};
    newSortDirection[sortKey] = nextSortDirection;
    setUserLocation(newLocations)
    setSortDirection(newSortDirection)
  }

  function getFilterRows(rows, filterKey) {
    return rows.filter(row => {
      return Object.values(row).some(item => (""+ item).toLowerCase().includes(filterKey))
    })
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>React Pure Table</h2> 
      Search: <input type="text" value={textHeader} onChange={e => setTextHeader(e.target.value)} />
      <br />
      <br />
      <table border={1} cellPadding={0} cellSpacing={0} className="pure-table">
        <thead>
          <tr>
            {userLocation.headers.map((header, index) => (
              <th key={index} onClick={() => sortColumn(header) }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getFilterRows(userLocation.data, textHeader).map((location, idx) => (
            <tr key={idx}>
              {userLocation.headers.map((header, headerIndex) => (
                <td key={headerIndex}>{location[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PureTable
