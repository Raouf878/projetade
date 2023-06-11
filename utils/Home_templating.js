function CreatArray(Length){
return new Promise((resolve,reject)=>{
  if (Length){

    const rows = Length;
    const cols = 12;
    const Data = new Array(rows);
    for (let i = 0; i < rows; i++) {
      Data[i] = new Array(cols);
    }
    
    resolve(Data)}
    else {
        reject(new Error('No data to show'))
    }
});}
function Dateformatter(Dataparam){
    const date =new Date(Dataparam)
    const formattedDate = date.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return formattedDate;
  }
function datapusher(index_i_value,index_j_value,DataToUse,Data){
   
    Data[index_i_value][index_j_value]=DataToUse;
    
    



}

async function PushToArray(PushedData, Length) {
    if (typeof PushedData === 'object') {
      return new Promise((resolve, reject) => {
        CreatArray(Length)
          .then((CreatedArray) => {
            for (let i = 0; i < Length; i++) {
              for (let j = 0; j <1; j++) {
                var R=j;
                    const {
                        accident_title,
                        population_affected,
                        accident_start_date,
                        accident_start_time,
                        accident_end_date,
                        accident_end_time,
                        acc_ID,
                        team_ID,
                        local_ID,
                        longtitude,
                        latitude,
                        address,
                        accident_cost,
                        accident_status,
                        accident_priority,
    
                        }=PushedData[i];
                datapusher(i,j,acc_ID,CreatedArray);
                j++
                datapusher(i,j,accident_start_time,CreatedArray);
                j++
                datapusher(i,j,accident_end_time,CreatedArray);
                j++
                datapusher(i,j,Dateformatter(accident_start_date),CreatedArray);
                j++
                datapusher(i,j,Dateformatter(accident_end_date),CreatedArray);
                j++
                datapusher(i,j,accident_priority,CreatedArray);
                j++
                datapusher(i,j,accident_cost,CreatedArray);
                j++
                datapusher(i,j,local_ID,CreatedArray);
                j++
                datapusher(i,j,team_ID,CreatedArray);
                j++
                datapusher(i,j,accident_title,CreatedArray);
                j++
                datapusher(i,j,population_affected,CreatedArray);
                j++
                datapusher(i,j,longtitude,CreatedArray);
                j++
                datapusher(i,j,latitude,CreatedArray);
                j++
                datapusher(i,j,address,CreatedArray);
                j++
                datapusher(i,j,accident_status,CreatedArray);
                j=R;
              }
            }
            resolve(CreatedArray);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      throw new Error('Please insert object data');
    }
  }
module.exports={
    CreatArray,
    datapusher,
    PushToArray
}