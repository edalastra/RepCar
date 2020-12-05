import React, { useState, useEffect } from 'react';
import AlertComponent from '../../components/AlertComponent';
import { apiworker } from '../../api';
import InputComponent from '../../components/InputComponent';

const Intranet = () => {
  const [alert, setAlert] = useState({});
  const [workers, setWorkers] = useState([]);
  const [list, setList] = useState([])

  const filterList = event => {
    let string = event.target.value
    setList(workers.filter(worker => 
      worker.user.name.toLowerCase().indexOf(string.toLowerCase()) !== -1
      ));
  };

   useEffect(() => {
       (async () => {
           try {
            const { data } = await apiworker('/workers');
            setWorkers(data);
            setList(data)
           } catch(err) {
              setAlert({
                msg: 'Não foi possível carregar os dados, verifique seu nível de acesso',
                status: 'danger'
              })
           }
       })()
   },[]);


  return (
  <>
    <AlertComponent msg={alert.msg} status={alert.status} />
  
    <div className="card-panel">
    <div className="row">
      <div className="col m6">
        <h3>Lista de Funcionários</h3>
      </div>
      <div className="col m4">
        <InputComponent
        id="search" 
        type="text"
        label="Pesquisar"
        onChange={filterList}
        />
      </div>
    </div>
    <div className="row">
      <div  class="collection with-header">
          {list.map((worker, index) => (
            <a key={index} class="collection-item">{worker.user.name}
            </a>
          ))}
      </div>
    </div>
    </div>
    
 </>
  );
}

export default Intranet;