const form=document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');


var upd;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const cType=form.elements.coinType.value;
    fetchPrice(cType);
});

const fetchPrice = async(cType)=>{
      const r = await axios.get(`https://api.cryptonator.com/api/ticker/${cType}`);
      const price= r.data.ticker.price;
      const volume= r.data.ticker.volume;
      const change= r.data.ticker.change;
      const base= r.data.ticker.base;
      const target= r.data.ticker.target;
      const time= r.data.timestamp;

      var col = "green";
      if (change < 0) {
       col = "red";
      }

      res.innerHTML=`<tr style="background-color:#FFA500; color:white; font-weight:700">
      <td>
        Property
      </td>
      <td>
        Value
      </td>
    </tr>
    <tr>
      <td>
        ${base}
      </td>
      <td>${price} ${target}</td>
    </tr>
    <tr>
      <td>
        Volume
      </td>
      <td style="color:blue">${volume}</td>
    </tr>
    <tr>
      <td>
        Change
      </td>
      
      <td style="color:${col};">${change}</td>
    </tr>
    <tr>
      <td>
        Last Update
      </td>
      <td>${time}</td>
    </tr>`
    
     
    upd = setTimeout(() => fetchPrice(cType), 10000);
  

};

