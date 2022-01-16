<template>
<!--  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">-->
<!--    <el-tab-pane label="信息审核" name="text">-->
<!--      -->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-main>
      <el-row type="flex" justify="space-around" style="height: calc(90vh - 90px);margin-top: 20px;min-height: 300px">
        <el-col  :span="5">
          <h2 style="text-align: center;margin-bottom: 10px;">待审核文件列表</h2>
          <el-row type="flex" justify="center">
            <el-radio-group v-model="radio" @change="radioChange()">
              <el-radio-button label="PDF"></el-radio-button>
              <el-radio-button label="HTML"></el-radio-button>
              <el-radio-button label="图片"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-table
              :data="fileList"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="文件名"
                :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column
                prop="status"
                label="抽取状态"
                width="90">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 'yes'">已完成</span>
                <span v-else>未完成</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <iframe v-if="radio === 'PDF'" :src="pdfUrl" height="100%" width="100%" style="border: none"></iframe>
          <iframe v-else-if="radio === 'HTML'" :src="htmlUrl" height="100%" width="100%" style="border: none"></iframe>
          <img v-else :src="picUrl" height="100%" width="100%" alt="none">
        </el-col>
        <el-col :span="6" style="height: 100%;">
          <JsonEditor
              ref="jsonEditor"
              v-model="ioc_result"
              :show-save-btns="true"
              @onJsonSave="onJsonSave"
          ></JsonEditor>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import JsonEditor from "@/components/JsonEditor";
export default {
  name: "Audit",
  components:{
    JsonEditor
  },
  data() {
    return {
      activeName: 'text',
      radio: 'PDF',
      fileList:[
        {
          name: "APT10_ sophisticated multi-layered loader Ecipekac discovered in A41APT campaign _ Securelist.pdf",
          status: "yes",
        },
        {
          name: "【奇安信】盲眼鹰（APT-C-36）针对哥伦比亚政企机构的攻击活动揭露.pdf",
          status: "yes",
        },
        {
          name: "【奇安信】美人鱼行动（APT-C-07）长达6年的境外定向攻击活动揭露.pdf",
          status: "no",
        },
        {
          name: "【奇安信】双尾蝎（APT-C-23）伸向巴以两国的毒针.pdf",
          status: "no",
        },
      ],
      currentRow: 1,
      pdfUrl:"/static/【奇安信】盲眼鹰（APT-C-36）针对哥伦比亚政企机构的攻击活动揭露.pdf",
      htmlUrl:"https://www.baidu.com",
      picUrl: require("../../assets/img/pic.png"),
      ioc_result: {"ip": ["128.90.106.22", "128.90.107.21", "128.90.107.189", "128.90.107.236", "128.90.108.126", "128.90.114.5", "128.90.115.28", "128.90.115.179"], "domain": ["diangovcomuiscia.com", "muiscia.dian.gov.co", "www.ecopetrol.com.co", "caivirtual.policia.gov.co", "www.dian.gov.co", "www.fiscalia.gov.co", "www.migracioncolombia.gov.co", "mentes.publicvm.com", "ceoempresarialsas.com", "ceosas.linkpc.net", "ceoseguros.com", "ismaboli.com", "medicosco.publicvm.com", "dianmuiscaingreso.com", "dianportalcomco.com", "cloudblogs.microsoft.com"], "md5": ["0c97d7f6a1835a3fe64c1c625ea109ed", "3de286896c8eb68a21a6dcf7dae8ec97", "f2d5cb747110b43558140c700dbf0e5e", "ef9f19525e7862fb71175c0bbfe74247", "4fd291e3319eb3433d91ee24cc39102e", "16d3f85f03c72337338875a437f017b4", "27a9ca89aaa7cef1ccb12ddefa7350af", "3a255e93b193ce654a5b1c05178f7e3b", "3be90f2bb307ce1f57d5285dee6b15bc", "46665f9b602201f86eef6b39df618c4a", "476657db56e3199d9b56b580ea13ddc0", "4bbfc852774dd0a13ebe6541413160bb", "51591a026b0962572605da4f8ecc7b1f", "66f332ee6b6e6c63f4f94eed6fb32805", "688b7c8278aad4a0cc36b2af7960f32c", "7fb75146bf6fba03df81bf933a7eb97d", "91cd02997b7a9b0db23f9f6377315333", "9a9167abad9fcab18e02ef411922a7c3", "a91157a792de47d435df66cccd825b3f", "b4ab56d5feef2a35071cc70c40e03382", "b6691f01e6c270e6ff3bde0ad9d01fff", "cbbd2b9a9dc854d9e58a15f350012cb6", "cf906422ad12fed1c64cf0a021e0f764", "e3050e63631ccdf69322dc89bf715667", "ea5b820b061ff01c8da527033063a905", "eb2ea99918d39b90534db3986806bf0c", "ecccdbb43f60c629ef034b1f401c7fee", "ee5531fb614697a70c38a9c8f6891ed6", "fd436dc13e043122236915d7b03782a5", "bf95e540fd6e155a36b27ad04e7c8369", "ce589e5e6f09b603097f215b0fb3b738", "b0687578284b1d20b9b45a34aaa4a592", "0915566735968b4ea5f5dadbf7d585cc", "0a4c0d8994ab45e5e6968463333429e8", "0e874e8859c3084f7df5fdfdce4cf5e2", "1733079217ac6b8f1699b91abfb5d578", "19d4a9aee1841e3aee35e115fe81b6ab", "1bc52faf563eeda4207272d8c57f27cb", "20c57c5efa39d963d3a1470c5b1e0b36", "2d52f51831bb09c03ef6d4237df554f3", "30ecfee4ae0ae72cf645c716bef840a0", "3155a8d95873411cb8930b992c357ec4", "3205464645148d393eac89d085b49afe", "352c40f10055b5c8c7e1e11a5d3d5034", "42f6f0345d197c20aa749db1b65ee55e", "4354cb04d0ac36dab76606c326bcb187", "43c58adee9cb4ef968bfc14816a4762b", "4daacd7f717e567e25afd46cbf0250c0", "4e7251029eb4069ba4bf6605ee30a610", "50064c54922a98dc1182c481e5af6dd4", "519ece9d56d4475f0b1287c0d22ebfc2", "53774d4cbd044b26ed09909c7f4d32b3", "5be9be1914b4f420728a39fdb060415e", "5dee0ff120717a6123f1e9c05b5bdbc2", "60daac2b50cb0a8bd86060d1c288cae2", "6d1e586fbbb5e1f9fbcc31ff2fbe3c8c", "763fe5a0f9f4f90bdc0e563518469566", "7a2d4c22005397950bcd4659dd8ec249", "7b69e3aaba970c25b40fad29a564a0cf", "8518ad447419a4e30b7d19c62953ccaf", "8ec736a9a718877b32f113b4c917a97a", "940d7a7b6f364fbcb95a3a77eb2f44b4", "9b3250409072ce5b4e4bc467f29102d2", "9db2ac3c28cb34ae54508fab90a0fde7", "a1c29db682177b252d7298fed0c18ebe", "a3f0468657e66c72f67b7867b4c03b0f", "a7cc22a454d392a89b62d779f5b0c724", "aaf04ac5d630081210a8199680dd2d4f", "ac1988382e3bcb734b60908efa80d3a5", "ad2c940af4c10f43a4bdb6f88a447c85", "afb80e29c0883fbff96de4f06d7c3aca", "b0ed1d7b16dcc5456b8cf2b5f76707d6", "b3be31800a8fe329f7d73171dd9d8fe2", "b5887fc368cc6c6f490b4a8a4d8cc469", "b9d9083f182d696341a54a4f3a17271f", "c654ad00856161108b90c5d0f2afbda1", "ccf912e3887cae5195d35437e92280c4", "d0cd207ae63850be7d0f5f9bea798fda", "df91ac31038dda3824b7258c65009808", "e2771285fe692ee131cbc072e1e9c85d", "e2f9aabb2e7969efd71694e749093c8b", "e3dad905cecdcf49aa503c001c82940d", "e4461c579fb394c41b431b1268aadf22", "e770a4fbada35417fb5f021353c22d55", "e7d8f836ddba549a5e94ad09086be126", "e9e4ded00a733fdee91ee142436242f4", "edef2170607979246d33753792967dcf", "f1e85e3876ddb88acd07e97c417191f4", "f2776ed4189f9c85c66dd78a94c13ca2", "f2d81d242785ee17e7af2725562e5eae", "f3d22437fae14bcd3918d00f17362aad", "f7eb9a41fb41fa7e5b992a75879c71e7", "f90fcf64000e8d378eec8a3965cff10a"], "sha1": [], "sha256": [], "url": ["hxxp://diangovcomuiscia.com/media/a.jpg", "http://ceoempresarialsas.com/js/d.jpg", "http://ceoseguros.com/css/c.jpg", "http://ceoseguros.com/css/d.jpg", "http://diangovcomuiscia.com/media/a.jpg", "http://dianmuiscaingreso.com/css/w.jpg", "http://dianportalcomco.com/bin/w.jpg", "http://ismaboli.com/dir/i.jpg", "http://ismaboli.com/js/i.jpg", "https://cloudblogs.microsoft.com/microsoftsecure/2018/05/10/enhancing-office-365-advanc", "http://www.pwncode.club/2018/09/mhtml-macro-documents-targeting.html"], "filename": ["609776.doc", "cuenta.doc", "2018.doc", "ip.doc", "305351T.doc", "Colombia.doc", "ciudadania.doc", "a.jpg", "1.exe", "lzma.dll", "inicado.rar", "e28cf7104647330a03f6d.bin", "Datacredito.doc", "inicado.doc", "5098.doc", "codeudor.doc", "detallada.doc", "Regalo.doc", "fotos.doc", "fecha.doc", "solicitado.doc", "electronico.doc", "509876.doc", "Navidad.doc", "IMPORTANT.doc", "pendiente.doc", "copia.nono.txt", "BoardingPass.doc", "text.doc", "renta.doc", "d.jpg", "c.jpg", "w.jpg", "i.jpg", "mhtml-macro-documents-targeting.html"], "Windows_path": ["C:\\Users\\kenneth.ubeda\\Desktop\\Migracion"], "registry_path": []}
    };
  },

  methods: {
    radioChange(){
      console.log(this.radio)
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSelectionChange(){
      // this.multipleSelection = val;
    },
    onJsonSave(value) {
      if (this.jsonCode !== value) {
        this.jsonCode = value;
      }
      console.log(this.jsonCode)
    }
  },
  created() {
    // this.jsonData =  JSON.parse(JSON.stringify(this.jsonData));
    // console.log(this.jsonData)
  },
  mounted() {

  },
  watch: {

  },
}
</script>

<style>
.edit-cell {
  min-height: 25px;
  cursor: pointer;
}
</style>
