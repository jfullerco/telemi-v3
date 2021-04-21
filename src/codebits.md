Get key and value data from a mapped array of Objects:

{sites.map(site => (
        Object.keys(site).map(key => (
          <>
            <thead>
        
              {key}
            
            </thead>
          
          <tbody>
          
            <td>{site[key]}</td>
          
          </tbody>
          </>
        ))
      ))}