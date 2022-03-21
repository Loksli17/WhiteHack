
export default {
    
    checkFileSignature: (file: Buffer):  boolean  =>  {
       
        let
            flag           : boolean = false,
            byteNumber     : number  = 0,
            fileSignatures : any     = {
            
                pmb : {
                    0 : '0x42',
                    1 : '0x4d',
                    2 : '0x36',                
                },

                jpg : {
                    0 : '0xff',
                    1 : '0xd8',
                },

                png : {
                    0 : '0x89',
                    1 : '0x50',
                    2 : '0x4e',
                    3 : '0x47',
                    4 : '0x0d',
                    5 : '0x0a',
                    6 : '0x1a',
                    7 : '0x0a',
                }
            };
       

        for (let ext in fileSignatures) {
            byteNumber = 0; 
            for (let byte in fileSignatures[ext]){
                if (file[byteNumber] == fileSignatures[ext][byte]) {
                    flag = true;
                } else {
                    flag = false;
                    break;
                }
                byteNumber++;
            }
            if (flag) return flag;                       
        }
         
        return flag;
    }
}