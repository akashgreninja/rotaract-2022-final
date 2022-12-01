const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const firebase = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  DocumentReference,
} = require("firebase-admin/firestore");

const db = getFirestore();



const testdata=[
  {
    "title": "Anushka Thakur ",
    "USN": "1BI20EC020 ",
    "Date of birth": "07/17/2001",
    "Blood Group": "B+",
    "post": "President",
    "instagram": "@thakur_anushka1702",
    "linkedin": "https://www.linkedin.com/in/anushka-thakur-231419201",
    "Hobbies": "Playing guitar,  singing, painting, binge watching and coding. ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FInShot_20211204_131738283%20-%20Anushka%20Thakur.jpg?alt=media&token=c6fd2fa8-8a00-4cb7-b1f0-28d61c84b401"
   },
   {
    "title": "Ananya Shree ",
    "USN": "1BI18EC010",
    "Date of birth": "06/18/1999",
    "Blood Group": "B+",
    "post": "Immediate Past President ",
    "instagram": "ananya.shreee",
    "linkedin": "Ananya Shree",
    "Hobbies": "Cooking , painting , dancing",
    'image':'https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2F47D9EC65-86C1-465A-957F-B9027BACF7AB%20-%20Ananya%20Shree.jpeg?alt=media&token=94552a94-4752-4616-b47f-0bf7fa4e7528'
   },
   {
    "title": "Sunaina G P",
    "USN": "1BI20CS176",
    "Date of birth": "10/22/2002",
    "Blood Group": "O+",
    "post": "Vice-President",
    "instagram": "gpsunaina",
    "linkedin": "SUNAINA GP",
    "Hobbies": "Badminton,painting,drawing ",
    'image':"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FScreenshot_20220824-170129_WhatsApp%20-%20Sunaina%20Gattu.jpg?alt=media&token=43236a25-afe9-4bc1-ada5-490a9b3e404f"
   },
   {
    "title": "Manognya Lokesh Reddy ",
    "USN": "1BI20AI029",
    "Date of birth": "02/17/2003",
    "Blood Group": "O+",
    "post": "Secretary ",
    "instagram": "captain_chaos_86_",
    "linkedin": "http://www.linkedin.com/in/manognya-l-156180220",
    "Hobbies": "Football and swimming ",
    'image':"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FScreenshot_20220824-043557__01%20-%20Manognya%20.L.jpg?alt=media&token=778131b2-4055-41b9-bd2c-0711c1660a23"
   },
   {
    "title": "Prerana G.P ",
    "USN": "1BI20EC199 ",
    "Date of birth": "02/24/2002",
    "Blood Group": "B+",
    "post": "Joint Secretary ",
    "instagram": "prerana_g.p",
    "linkedin": "https://www.linkedin.com/in/prerana-gp",
    "Hobbies": "Listening to music, excercising, watching movies",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220824-WA0004__01%20-%20Prerana%20Gowda.jpg?alt=media&token=4f0f3d5a-aef6-4ff4-b5c3-708cf7c0bd0f",
   },
   {
    "title": "Koushal M Shastry",
    "USN": "1BI20CS094",
    "Date of birth": "04/15/2002",
    "Blood Group": "O+",
    "post": "Sargent",
    "instagram": "Koushalmshastry",
    "linkedin": "https://www.linkedin.com",
    "Hobbies": "Trekking",
    'image':"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2F1661320738011%20-%20koushal%20shastry.jpg?alt=media&token=1bd8868c-aab3-431d-8899-0cbde638c5f5"
   },
   {
    "Timestamp": "9/2/2022 15:57:08",
    "title": "Aatmika Mishra ",
    "USN": "1BI20EC001",
    "Date of birth": "11/27/2001",
    "Blood Group": "B+",
    "post": "Joint sergeant ",
    "instagram": "@aatmikamishr",
    "linkedin": "Aatmika Mishra ",
    "Hobbies": "Singing,binge watching,dancing, photographyhy ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG20220626154447%20-%20Aatmika%20Mishra.jpg?alt=media&token=53e61735-2d19-4775-94c8-5b7a9980a8ea"
   },
   {
    "title": "Divyam Nitin Vyas ",
    "USN": "1BI20EC041 ",
    "Date of birth": "09/05/2002",
    "Blood Group": "B+",
    "post": "Treasurer ",
    "instagram": "div.vyas",
    "linkedin": "https://www.linkedin.com/in/divyam-nitin-vyas-633843210",
    "Hobbies": "Travelling, Trekking, Singing, Bartending",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FPicsart_22-07-31_19-38-03-734%20-%20Divyam%20Nitin%20Vyas.jpg?alt=media&token=8edd150b-b0ee-42c6-8deb-42edf1679141"
   },
   {
    "title": "Ashish A Ankam ",
    "USN": "1BI21IS018",
    "Date of birth": "06/10/2003",
    "Blood Group": "B+",
    "post": "Club designer ",
    "instagram": "ashishaankam",
    "linkedin": "Ashish Ankam",
    "Hobbies": "Designing, shuttle badminton, treking, solo exploration ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220706_204126_541%20-%20Ashish%20Ankam.jpg?alt=media&token=08ca2169-56e7-4e32-aeea-b8ada3b4d099"
   },
   {
    "title": "Manu Vickram Siva S ",
    "USN": "1BI21IS052",
    "Date of birth": "12/24/2002",
    "Blood Group": "B+",
    "post": "Club Designer ",
    "instagram": "manu_vickkk",
    "linkedin": "https://linkedin.com/in/manuvickram",
    "Hobbies": "Graphic designing, digital art ,gaming , travelling, photography,cycling ,gymming",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220809-WA0005_2%20-%20Manu%20Vickram%20Siva.jpg?alt=media&token=64f8a6c9-5565-4694-ba14-3a3bb6664fd8",
    "description":"He is creative, innovative and loves designing and art. He believes in working as a team and he contributes his best skills and creates an everlasting impression!"
   },
   {
    "title": "Vikhyath",
    "USN": "1BI20AI054",
    "Date of birth": "07/01/2001",
    "Blood Group": "O+",
    "post": "International Service Director",
    "instagram": "_vikhyath_k",
    "linkedin": "https://www.linkedin.com/in/vikhyath-kulal-273a97118/",
    "Hobbies": "Sketching, Exploring, Playing Badminton",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FRotaract%20-%20Vikhyath%20K.jpg?alt=media&token=1bac651f-0c30-40de-91df-efa8b51b6559",
    "description":"Our ambitious and enthusiastic International director. The bright tech-head whose best day would be spent playing badminton and exploring."
   },
   {
    "Timestamp": "9/7/2022 22:02:54",
    "title": "Anjali Singh",
    "USN": "1BI20EC018 ",
    "Date of birth": "05/31/2001",
    "Blood Group": "A+",
    "post": "Professional Service Director",
    "instagram": "anjaliizz._",
    "linkedin": "None",
    "Hobbies": "Reading, Singing, Coding & Binge watching",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FAnji_1%20-%20Anjali%20Singh.JPG?alt=media&token=2bb9eeaf-c617-42ec-91cb-1ec096510ff6",
    "description":"A wanderlust, who is easily approachable, dedicated and passionate about her work also good in networking with people. She describes herself as a discipline and sincere person and also a dog lover."

   },
   {
    "title": "Akash Uday ",
    "USN": "1BI20ME007",
    "Date of birth": "05/13/2002",
    "Blood Group": "O+",
    "post": "Web Service Director ",
    "instagram": "Ak_uh@13",
    "linkedin": "https://www.linkedin.com/in/akash-uday-6a0b52224",
    "Hobbies": "Jogging, gaming ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220729_202653%20-%20Rotaract%20Bangalore%20B.I.T..jpg?alt=media&token=69896e0c-6ef2-4af0-98ed-581c13a56788",
    "description":"A fanatic gamer and a coder who loves dogs as well. He is a very hardworking person with a confident personality who loves giving seminar and talks. His dedication towards his work always guarantee success."
   },
   {
    "title": "Sidharth Premdas",
    
  
    "post": "Web Designer ",
    "instagram": "sidx.jpg",
    "linkedin": "https://linkedin.com/in/sidharthpremdas",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG20220804210745%20-%20Sidharth%20Premdas.jpg?alt=media&token=f6a4b5be-cb3b-4c2e-b317-e26b1e9e5b48",
    "description":"Sidharth is a diligent and sincere designer on our team. He is adaptable, kind, and friendliest of all. Sincere to work and loves to read. A person with an ambitious heart and tireless soul."
  
   },
   {
    "title": "Nikita D'Souza ",
    "USN": "1BI21CS086",
    "Date of birth": "12/19/2003",
    "Blood Group": "O+",
    "post": "Community Service Director ",
    "instagram": "__.nikiiiiiii.__",
    "linkedin": "Nikita D'Souza ",
    "Hobbies": "Singing, Playing the piano, photography, travelling and gardening ",
    'image':"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FImage2%20-%20Nikita%20D'Souza.png?alt=media&token=8f69885f-8c6f-423d-a52b-e7163fc39488",
    "description":"A Kind hearted and compassionate person, who is quite a chatty one too and loves outgoing. Along with that she has a deep affection for animals."
   },
   {
    "title": "Priyesh Awadh ",
    "USN": "1BI21EC105",
    "Date of birth": "12/03/2002",
    "Blood Group": "O+",
    "post": "Club Service Director ",
    "instagram": "priyeshawadh",
    "linkedin": "https://www.linkedin.com/in/priyesh-awadh-b40975249",
    "Hobbies": "Watching Harry Potter, listening music, cooking 🔪, very much into scifi.",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220824_073359%20-%20priyesh%20awadh.jpg?alt=media&token=20dede73-47c6-41d7-8045-6e3ea687aa8b",
    "description":"Our enthusiastic, lovable, and sarcastic director whose ideology is to live the moment and love dogs. The most versatile and eager-to-learn ambivert you will ever meet."
   },
   {
    "title": "Nilabjo Dutta",
    "USN": "1BI20EC083 ",
    "Date of birth": "03/14/2002",
    "Blood Group": "B+",
    "post": "Student ",
    "instagram": "_abhiiii_14",
    "linkedin": "Nilabjo Dutta ",
    "Hobbies": "- Professional Cricketer  - Athlete  - Artists ",
    'image':"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FPSX_20210712_215140.jpg?alt=media&token=a19459f5-3d83-4dc5-ac5c-f04135031328",
    "description":"He is an ambitious and self-motivated person who thrives in challenges and constantly sets goals for himself. Besides this he is also a resourceful person. He enjoys a fast-paced team-oriented environment and possess leadership qualities."
   },
   {
    "title": "Pradeep R Gowda",
    "USN": "1BI20ME064",
    "Date of birth": "11/02/2002",
    "Blood Group": "B+",
    "post": "Club Media Director",
    "instagram": "_pradeep_r_gowda_",
    "linkedin": "pradeep r",
    "Hobbies": "wildlife photography, travelling, anime, ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FSnapchat-628297114_edited%20-%20pradeep%20r.jpg?alt=media&token=5cce513d-12b1-457a-b20a-17432b9c4b41",
    "description":"He is a passionate photographer who has a keen interest in wildlife and has the zeal and curiosity to explore new places, adventurous sites, meet new people, create a unique bond among the people he meet. "
   },
   {
    "title": "Abhishek Govind ",
    "USN": "1BI20EC003",
    "Date of birth": "04/30/2001",
    "Blood Group": "B+",
    "post": "Club Photographer ",
    "instagram": "abhishek_govind",
    "linkedin": "https://www.linkedin.com/in/abhishek-govind-603418249",
    "Hobbies": "Photography, Love to play guitar",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220809-WA0046%20-%20Abhishek%20Govind.jpg?alt=media&token=5168cdb2-59e1-4d2b-832e-2aa4095957da",
    "description":"A flexible, hardworking and honest person. A passionate photographer who is just not into photography but also has a keen interest in music."
   },
   
  {
    "Timestamp": "9/2/2022 15:57:48",
    "title": "Supriya Rani ",
    "USN": "1BI20EC156",
    "Date of birth": "08/31/2002",
    "Blood Group": "B+",
    "post": "Editorial ",
    "instagram": "00__c_r_y_s_t_a_l__00",
    "linkedin": "https://www.linkedin.com/in/supriya-rani-a0a175244",
    "Hobbies": "Sketching,painting and listening music",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FInShot_20220902_155151108%20-%20Supriya%20Rani.jpg?alt=media&token=ad7d9e52-06d0-491c-bef9-f0f1e66261f8",
    "description":"A creative, funny, fun loving and highly extrovert person.. Who adores shine shades, art and music."
   },
   {
    "title": "Rishika Jallan",
    "USN": "1BI21EE027",
    "Date of birth": "11/23/2021",
    "Blood Group": "O+",
    "post": "Editorial",
    "instagram": "_rishika_jallan",
    "linkedin": "www.linkedin.com/in/rishika-jallan-538960249",
    "Hobbies": "Cooking, dancing, sketching, doodling",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FPicsart_22-08-24_04-07-30-710%20-%20Rishika%20Jallan.jpg?alt=media&token=1d6a54b4-b17a-4069-922a-7ffe0b82c389",
    "description":"A very ambitious, fun-loving, hard-working and energetic person, who thrives on challenges and constantly sets goals for herself, so that she has something to strive towards. She is also a very friendly and lively person."
   },
   {
    "title": "DS Prajwal Gowda",
    "USN": "1BI21AI018",
    "Date of birth": "12/18/2003",
    "Blood Group": "B+",
    "post": "Editorial",
    "instagram": ".",
    "linkedin": "https://www.linkedin.com/in/ds-prajwal-gowda",
    "Hobbies": "Reading Novels, Coding, Netflix, Gaming & Sleeping.",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220214-WA0025%20-%20Prajwal%20Gowda.jpg?alt=media&token=c7c13ad7-87d6-4979-94d5-ccc380d01ad2",
    "description":"A Solitary party person who adores animals."

   
   },
   
  {
    "title": "Siri Prakash ",
    "USN": "1BI20CS164 ",
    "Date of birth": "01/31/2002",
    "Blood Group": "B+",
    "post": "Editorial member",
    "instagram": "siriprakash31 ",
    "linkedin": " https://www.linkedin.com/in/siri-prakash-b8a863208",
    "Hobbies": "Reading books , listening to music , cooking ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20211214_113939_104%20-%20Siri%20Prakash.webp?alt=media&token=f2ebc55c-6aec-4a7b-ad9c-f76df0b3fe43",
    "description":"A person who believes and lives as said “Don’t be another brick in the wall”. She loves to travel new places and also a foodie.. She is very passionate about helping the needy and making this world a better place to live."
   },
   {
    "title": "Lovelesh Debnath ",
    "USN": "1BI21IS049",
    "Date of birth": "07/31/2002",
    "Blood Group": "B+",
    "post": "Editor team member",
    "instagram": "lovelesh_debnath_o_o",
    "linkedin": "Lovelesh Debnath (Kartik)",
    "Hobbies": "Cooking, calligraphy, learning new skills, drawing, books, guitar and IDK.",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220824-WA0003%20-%20Lovelesh%20Debnath%20(1).jpg?alt=media&token=6b1cbf94-2dc6-4519-8359-e024b63c470d",
    "description":"A Goofy person at most times, but, a serious Soul at crucial times. He loves to stay indoor with minimum human infaction."
   },
   {
    "title": "Hritika M Kalaria ",
    "USN": "1BI21EC058",
    "Date of birth": "04/22/2002",
    "Blood Group": "O+",
    "post": "Event Coordinator ",
    "instagram": "hritikamk2",
    "linkedin": "Hritika M Kalaria ",
    "Hobbies": "Dancing, painting, reading novels, listening to music, Taking a walk in nature",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG-20220224-WA0024%20-%20Hritika%20Kalaria.jpg?alt=media&token=b45189e0-ac0e-48b8-a542-ea7deb235fed",
    "description":"The amazing bomb shell of talents and an amazing analyst. Our passionate coordinator, whose curiosity is the real-life cheat code to her learning engine. With nature as her closest friend, nothing stops her from working."
   },
   {
    "title": "Hemanth.N",
    "USN": "1BI20CS076",
    "Date of birth": "07/12/2002",
    "Blood Group": "O+",
    "post": "Event Coordinator ",
    "instagram": "hemanth._.12",
    "linkedin": "https://www.linkedin.com/in/hemanth-n-287209202",
    "Hobbies": "Playing Basketball, swimming, watching anime",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220824_105911%20-%20Hemanth%20N.jpg?alt=media&token=a60e1fa6-416e-47d7-9b71-3d203f7fa1b6",
    "description":"He believes that with passion and hard work we can accomplish all we want. He is a quick learner who is always keen to learn new things. He is honest and straightforward."
   },
   {
    "title": "Kiran R",
    "USN": "1BI20CS093",
    "Date of birth": "05/16/2002",
    "Blood Group": "A+",
    "post": "Event Coordinator",
    "instagram": "__.__ki_r_an__.__",
    "linkedin": "Kiran R",
    "Hobbies": "Playing cricket and kabaddi.",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220824_113830%20-%20Rajappa%20Kiranr.jpg?alt=media&token=eb2a17eb-0178-456e-886a-c08e1843b89c",
    "description":"He is a passionate person who is full of energy and ready to overcome all his hurdles .Along with that he is hardworking who does all his work with dedication and perfection."
   },

   {
    "title": "Arnab Kar ",
    "USN": "1BI21IS015",
    "Date of birth": "09/20/2003",
    "Blood Group": "B+",
    "post": "Event Coordinator ",
    "instagram": "Arnab__kar",
    "linkedin": "https://www.linkedin.com/in/arnab-kar-b44a89223",
    "Hobbies": "Video games, singing, drawing, making stuff/DIY, listening to songs(English indie), books(a lil)",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2FIMG_20220824_133708%20-%20MrCrackShOt.jpg?alt=media&token=e1e8ba38-7842-468f-a865-9f18c6757e3a",
    "description":" He is highly energetic, ambiverted and loves meeting new people. He likes to help people and aspires to be rich one day. You can easily spot him as the “long-haired guy”."
   },
   {
    "title": "Prateekk",
    "USN": "1BI21CS098",
    "Date of birth": "12/17/2003",
    "Blood Group": "O+",
    "post": "Event coordinator ",
    "instagram": "Prateek kota",
    "linkedin": "https://www.linkedin.com/in/prateekkota2003/",
    "Hobbies": "Playing drums,listening to music, playing cricket ",
    "image":"https://firebasestorage.googleapis.com/v0/b/rotaract-2022-42d17.appspot.com/o/Board%2Fe13a8431-9963-4296-8184-d31f061321ca.jpg?alt=media&token=39bdd942-99dd-4181-abff-240f1768e01b",
    "description":"He is brave, honest and straight forward. Amidst chaos, one can find him thinking for a solution with patience and composure."
   },
 


  
 
 
 
 ]



router.get(
  "/getallbod/:year",

  async (req, res) => {
    const theyear = req.params.year;
    try {
      const citiesRef = db.collection(`${theyear}`);
      const snapshot = await citiesRef.orderBy('title').get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(testdata);
      // res.json(alldata)
    } catch (err) {
      console.log(err.message);
    }
  }
);

router.post("/adddata", async (req, res) => {
  const { post, title, image, year, description, instagram, linkedin } =
    req.body;
  const projects = db.collection(year);
  console.log(year);
  try {
    await projects.add({
      test: {
        post: post,
        title: title,
        description: description,
        year: year,
        linkedin: linkedin,
        instagram: instagram,
        image:image
      },
    });
    res.status(200).send({ msg: "sucessfully sent " });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

router.delete("/delete/:id/:collectionname", async (req, res) => {
  try {
    const projects = db.collection(`${req.params.collectionname}`);
    console.log(req.params.collectionname);
    console.log(req.params.id);

    const cardcheck = await projects.doc(req.params.id).delete();
    if (!cardcheck) {
      return res.status(404).send("not found");
    }

    res.send({ msg: `${req.params.collectionname}` });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
router.put("/update/:id", async (req, res) => {
  const { post, title, description, image, year } = req.body;

  try {
    console.log("we in");

    const projects = db.collection(`${year}`);

    const info = {};
    if (title) {
      `${(title = post)}`;
    }
    if (description) {
      `${(description = description)}`;
    }
    if (image) {
      `${(image = image)}`;
    }
    if (year) {
      `${(year = year)}`;
    }

    await projects.doc(req.params.id).update(`${year}`);
    res.send({ msg: "done" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
