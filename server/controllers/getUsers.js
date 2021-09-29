import axios from 'axios'

const refactorTableData = (data) => {
    const updatedData = []
    for(let row of data){
        let modifiedRowData = {...row}
        const arrayOfAddressData = Object.entries(modifiedRowData.address).map(([addrColumn,addrValue]) => {
            if(addrColumn === 'geo'){
                modifiedRowData['latitude'] = addrValue.lat;
                modifiedRowData['longitude'] = addrValue.lng
            }
            else{
                return addrValue
            }
        })
        modifiedRowData.address = arrayOfAddressData.join(' ').trim()
        for(let companyColumn in modifiedRowData.company){
            modifiedRowData["company "+companyColumn] = modifiedRowData.company[companyColumn]
        }
        delete modifiedRowData['company']

        updatedData.push(modifiedRowData)
    }
    return updatedData
}


export const getUsers = (req,res) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        const modifiedUserData = refactorTableData(response.data)
        return res.status(200).send(modifiedUserData)
    })
    .catch(err => {
        
        return res.status(500).send("Server error")
    })
}