import { PrismaClient } from '@prisma/client';
import {  getServerSession} from "next-auth";
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function PUT(request:Request,res:any) {
  console.log('put request')

    var session:any= await getServerSession();
    let response = NextResponse.next()
    if(!session){
        return NextResponse.json({ error: 'unAuth' }, { status: 401 })

      }
    if (session !== null) {
    const email = session.user.email;
    const data=await request.json();
   

    try{
      let update=await prisma.user.update({
        where:{
          email:email
        },
         data:{
            email,
            name:data.name,
            phone:data.phone,
            ElecricityId:data.ElecricityId,
            ElectricityScNo:data.ElectricityScNo,
            ElectricityOfficeName:data.ElectricityOfficeName,
            enabled:data.enabled,
            transactionId:data.transactionID,



           },
      });

      return NextResponse.json({message:"updated succesfully"},{status:200});


    }catch(e){
      return NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
        

    }




}
}

export async function POST(request:Request,res:any) {
  let data:any={
    "AANBU DC": "243",
    "AMUWA DC": "273",
    "ANARMANI DC": "268",
    "ARGHAKHACHI DC": "248",
    "ATTARIYA DC": "345",
    "BADEGAUN SDC": "237",
    "BAGLUNG DC": "299",
    "BALAJU DC": "215",
    "BANESHWOR DC": "219",
    "BANSGADHI DC": "373",
    "BARDAGHAT SDC": "267",
    "BELBARI DC": "317",
    "BELTAR DC": "339",
    "BHADRAPUR DC": "265",
    "BHAIRAHAWA DC": "272",
    "BHAKTAPUR DC": "245",
    "BHARATPUR DC": "211",
    "BHIMAN DC": "270",
    "BHOJPUR DC": "316",
    "BIRATNAGAR DC": "285",
    "BIRGUNJ DC": "286",
    "BUDHABARE SDC": "333",
    "BUDHANILKANTHA DC": "223",
    "BUTWAL DC": "229",
    "CHABAHIL DC": "220",
    "CHAINPUR DC": "315",
    "CHANDRANIGAPUR DC": "356",
    "CHAPAGAUN SDC": "217",
    "DAMAK DC": "280",
    "DAMAULI DC": "241",
    "DHADING DC": "224",
    "DHANGADI DC": "344",
    "DHANKUTA DC": "284",
    "DHARAN DC": "212",
    "DHARKE DC": "269",
    "DHULABARI SDC": "320",
    "DUHABI DC": "271",
    "FIKKAL DC": "308",
    "GAIDAKOT SDC": "235",
    "GAIGHAT DC": "297",
    "GAJURI DC": "225",
    "GAURADAHA DC": "287",
    "GAUR DC": "323",
    "GAUSALA DC": "359",
    "GHORAHI DC": "250",
    "GORKHA DC": "238",
    "GULARIYA DC": "242",
    "GULMI DC": "290",
    "HANUMAN NAGAR SDC": "330",
    "HETAUDA DC": "231",
    "IILAM DC": "292",
    "INARUWA DC": "281",
    "ITAHARI DC": "264",
    "JALESHOR DC": "331",
    "JANAKPUR DC": "261",
    "JORPATI DC": "221",
    "KALAIYA DC": "318",
    "KANCHANPUR DC": "351",
    "KATARI DC": "338",
    "KAVRE DC": "247",
    "KAWASOTI DC": "234",
    "KHAJURA SDC": "325",
    "KHANDBARI DC": "306",
    "KIRTIPUR DC": "246",
    "KOHALPUR DC": "324",
    "KRISHNANAGAR DC": "309",
    "KULESHOR DC": "205",
    "LAGANKHEL DC": "216",
    "LAHAN DC": "293",
    "LAMAHI DC": "251",
    "LAMJUNG DC": "332",
    "LEKHNATH DC": "228",
    "LUBHU SDC": "218",
    "LUMBINI DC": "307",
    "MAHARAJGUNJ DC": "222",
    "MAHENDRANAGAR DC": "347",
    "MAJUWA DC": "239",
    "MALANGWA DC": "305",
    "MANTHALI DC": "296",
    "MIRCHAIYA DC": "334",
    "MUDHE DC": "362",
    "MYAGDI DC": "319",
    "NAXAL DC": "214",
    "NAYAMILL DC": "313",
    "NEPALGUNJ DC": "256",
    "NIJGADH DC": "279",
    "NUWAGAN DC": "232",
    "OKHALDHUNGA DC": "355",
    "PALPA DC": "263",
    "PALUNG DC": "262",
    "PANAUTI DC": "335",
    "PARASI DC": "321",
    "PARBAT DC": "240",
    "PASHUPATINAGAR DC": "314",
    "POKHARA DCS": "226",
    "POKHARA GRAMIN SDC": "227",
    "POKHARIYA DC": "360",
    "PULCHOWK DC": "207",
    "RAJAPUR DC": "371",
    "RAJBIRAJ DC": "329",
    "RAMECHHAP DC": "336",
    "RANGELI DC": "291",
    "RANI SDC": "288",
    "RATNAPARK DC": "201",
    "RIDI DC": "311",
    "RUKUM DC": "346",
    "SAKHUWA SDC": "374",
    "SANISCHARE SDC": "352",
    "SANKHU DC": "322",
    "SIMARA DC": "230",
    "SINDHULI DC": "233",
    "SIRAHA DC": "312",
    "SURKHET DC": "353",
    "TANDI DC": "236",
    "TAULIHAWA DC": "283",
    "TEHRATHUM DC": "341",
    "THIMI DC": "244",
    "TIKAPUR DC": "342",
    "TRIVENI DC": "328",
    "TULSIPUR DC": "252",
    "TUMLINGTAR DC": "363",
    "URLABARI DC": "295",
    "VURIGAUN DC": "372",
    "ACHHAM DC": "391",
    "ARUGHAT DC": "384",
    "BAITADI DC": "381",
    "BARAHATHAWA DC": "399",
    "BARDIBAS DC": "378",
    "BARHABISE DC": "277",
    "BELAURI DC": "348",
    "BHAJANI DC": "370",
    "BODEBARSAIEN DC": "301",
    "CHANAULI DC": "294",
    "CHANDRANIGAHPUR DC (CHAPUR)": "356",
    "CHAUTARA DC": "326",
    "DADELDHURA DC": "385",
    "DAILEKH DC": "350",
    "DARCHULA DC": "383",
    "DHANUSHADHAM DC": "302",
    "DHUNCHE DC": "375",
    "DIKTEL DC": "397",
    "DOLAKHA DC": "274",
    "DOTI DC": "388",
    "DUMRE DC": "390",
    "FICKEL DC": "308",
    "GAURADAH DC": "287",
    "GAUSHALA DC (Mahottari)": "359",
    "HANUMAN Nagar SUB DC": "330",
    "JAHARE DC": "354",
    "JAJARKOT DC": "392",
    "JALESHWOR DC": "331",
    "JIRI DC": "275",
    "JOGBUDA DC": "386",
    "KALIKOT DC": "380",
    "KANCHANPUR DC (Saptari)": "351",
    "Khadbari DC": "306",
    "KHAJURA DC": "325",
    "KHARIDHUNGA DC": "282",
    "KNAGAR DC": "309",
    "LALBANDI DC": "379",
    "LAMKI DC": "343",
    "LEKNATH DC": "228",
    "MAINAPOKHARI DC": "376",
    "MANGALSEN DC": "396",
    "MAULAPUR DC": "303",
    "MELAMCHI DC": "337",
    "MIRCHIYA DC": "334",
    "MIRMI DC": "310",
    "PANCHKHAL DC": "249",
    "PANCHTHAR DC": "395",
    "PATAN(Baitadi) DC": "382",
    "POKHARA DC": "226",
    "RANI SUB DC": "288",
    "ROLPA DC": "387",
    "SAKHUWA DC": "374",
    "SALYAN DC": "349",
    "SILGADHI DC": "398",
    "SIMRAUNGADH DC": "304",
    "SINDHU DC": "276",
    "SURAJPURA DC": "327",
    "SURUNGA DC": "358",
    "SYANGJA DC": "278",
    "TATOPANI DC": "377",
    "PYUTHAN DC": "357",
    "YADUKUWA DC": "389"
  }
  function getValueByName(name: string): any {
    return data[name] || null;
  }
    var session:any= await getServerSession();
    let response = NextResponse.next()
    console.log(session)

     

    if (session !== null) {
    const email = session.user.email;
    const data=await request.json();


if (data.name && data.phone && data.ElecricityId && data.ElectricityScNo && data.ElectricityOfficeName && data.transactionID !== '') {
    // All variables are not empty, and transactionID is not empty.
    // You can proceed with your code here.
    console.log('all good')
    
} else {
  console.log('something went wrong')
  return  NextResponse.json({message:'err'},{status:404})
   



    
   
  

}


//     if (Object.keys(data.address).every(function(x) { return data.address[x]===''||data.address[x]===null;}) === false) {
//    console.log('has something');
// } else {
//    console.log('nothing');
// }

    
    try{

      console.log('creating')

      
      
      
      
   
 
      // Example usage:
      const cityName = data.ElectricityOfficeName;
      const cityValue = getValueByName(cityName);
      
      if (cityValue !== null) {
        console.log(`Value for ${cityName}:`, cityValue);
      } else {
        console.log(`${cityName} not found in the data.`);
      }
      

          
          const user= await prisma.user.create({
        
           data:{
            email,
            name:data.name,
            phone:data.phone,
            ElecricityId:data.ElecricityId,
            ElectricityScNo:data.ElectricityScNo,
            ElectricityOfficeNo:cityValue?cityValue:"",
            ElectricityOfficeName:data.ElectricityOfficeName,
            transactionId:data.transactionID,



           },


         
            
            
            


        

    });
        return  NextResponse.json({message:"Succesfully created the users"},{status:200})


    }catch(e){

          return NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
        
    }


  }
  



    


   
    // try{

    //     // const body=await request.json();
    //     // const {username,password,email}=body;

    //    const user= await prisma.user.findUnique({
           
    //    });

    //     return Response.json({message:"success"})

    // }catch(e){
    //     return NextResponse.error();
    // }

}