// Ensure html2pdf is globally available
declare const html2pdf: any;

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumePage = document.getElementById('resume-page') as HTMLElement;
const resumePhoto = document.getElementById('profile-picture') as HTMLImageElement;
const resumeName = document.getElementById('resume-name') as HTMLHeadingElement;
const resumeRole = document.getElementById('resume-role') as HTMLHeadingElement;
const resumeEmail = document.getElementById('resume-email') as HTMLSpanElement;
const resumePhone = document.getElementById('resume-phone') as HTMLSpanElement;
const resumeFacebook = document.getElementById('resume-facebook') as HTMLSpanElement;
const resumeLinkedin = document.getElementById('resume-linkedin') as HTMLSpanElement;
const resumeAddress = document.getElementById('resume-address') as HTMLSpanElement;
const resumeEducation = document.getElementById('resume-education') as HTMLLIElement;
const resumeExperience = document.getElementById('resume-experience') as HTMLDivElement;
const resumeEdit = document.getElementById('resume-edit') as HTMLButtonElement;
const resumeSkills = document.getElementById('resume-skills') as HTMLLIElement;
const shareLinkButton = document.getElementById('share-button') as HTMLButtonElement;














form.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  const nameInput = (document.getElementById('name') as HTMLInputElement).value;
  const roleInput = (document.getElementById('role') as HTMLInputElement).value;
  const emailInput = (document.getElementById('email') as HTMLInputElement).value;
  const phoneInput = (document.getElementById('phone') as HTMLInputElement).value;
  const addressInput = (document.getElementById('address') as HTMLInputElement).value;
  const linkedinInput = (document.getElementById('linkedin') as HTMLInputElement).value;
  const facebookInput = (document.getElementById('facebook') as HTMLInputElement).value;
  const profilePictureInput = document.getElementById('picture') as HTMLInputElement;
  const educationInput = (document.getElementById('education') as HTMLTextAreaElement).value;
  const skillsInput = (document.getElementById('skills') as HTMLTextAreaElement).value;
  const experienceInput = (document.getElementById('experience') as HTMLTextAreaElement).value;

  const photoFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
  let photoBase64 = '';

  if (photoFile) {
    photoBase64 = await fileToBase64(photoFile);
    if (!photoBase64.startsWith('data:image')) {
      photoBase64 = `data:image/jpeg;base64,${photoBase64}`;
    }
    await saveImageToIndexedDB(photoBase64);
    resumePhoto.src = photoBase64;
  }

  // Set Resume Data
  resumeName.textContent = nameInput;
  resumeRole.textContent = roleInput;
  resumeEmail.textContent = emailInput;
  resumePhone.textContent = `Phone: ${phoneInput}`;
  resumeAddress.textContent = addressInput;
  resumeLinkedin.textContent = linkedinInput;
  resumeFacebook.textContent = facebookInput;
  resumeEducation.textContent = educationInput;
  resumeSkills.textContent = skillsInput;
  resumeExperience.textContent = experienceInput;






    


  
  const queryParams = new URLSearchParams({
    resumeName: nameInput,
    resumeRole: roleInput,
    resumeEmail: emailInput,
    resumePhone: phoneInput,
    resumeAddress: addressInput,
    resumeEducation: educationInput,
    resumeSkills: skillsInput,
    resumeExperience: experienceInput
  });



  document.querySelector('.resume')?.classList.add('hidden');
  resumePage.classList.remove('hidden');  
  
  document.querySelector('.button .hidden1')?.classList.remove('hidden1');



  const uniqueUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
  window.history.replaceState(null, '', `?${queryParams.toString()}`);

  shareLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(uniqueUrl);
    alert('Shareable link copied to clipboard!');
  });
});







function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject('Error converting file to Base64');
    reader.readAsDataURL(file);
  });
}



const dbName = 'ResumeDB';
const storeName = 'ProfilePictures';

async function saveImageToIndexedDB(imageData: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      store.put({ id: 1, image: imageData });
      resolve('Image saved successfully!');
    };

    request.onerror = () => reject('Failed to store image.');
  });
}


window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('resumeName')) {
    resumeName.textContent = params.get('resumeName')!;
    resumeRole.textContent = params.get('resumeRole')!;
    resumeEmail.textContent = params.get('resumeEmail')!;
    resumePhone.textContent = `Phone: ${params.get('resumePhone')}`;
    resumeAddress.textContent = params.get('resumeAddress')!;
    resumeEducation.textContent = params.get('resumeEducation')!;
    resumeSkills.textContent = params.get('resumeSkills')!;
    resumeExperience.textContent = params.get('resumeExperience')!;








    
    const dbRequest = indexedDB.open(dbName, 1);
    dbRequest.onsuccess = async () => {
      const db = dbRequest.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(1);
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          resumePhoto.src = getRequest.result.image;
        }
      };
    };

    document.querySelector('.resume')?.classList.add('hidden');
    resumePage.classList.remove('hidden');
  }





};



