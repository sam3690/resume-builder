"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById('resume-form');
const resumePage = document.getElementById('resume-page');
const resumePhoto = document.getElementById('profile-picture');
const resumeName = document.getElementById('resume-name');
const resumeRole = document.getElementById('resume-role');
const resumeEmail = document.getElementById('resume-email');
const resumePhone = document.getElementById('resume-phone');
const resumeFacebook = document.getElementById('resume-facebook');
const resumeLinkedin = document.getElementById('resume-linkedin');
const resumeAddress = document.getElementById('resume-address');
const resumeEducation = document.getElementById('resume-education');
const resumeExperience = document.getElementById('resume-experience');
const resumeEdit = document.getElementById('edit-button');
const resumeSkills = document.getElementById('resume-skills');
const shareLinkButton = document.getElementById('share-button');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    event.preventDefault();
    const nameInput = document.getElementById('name').value;
    const roleInput = document.getElementById('role').value;
    const emailInput = document.getElementById('email').value;
    const phoneInput = document.getElementById('phone').value;
    const addressInput = document.getElementById('address').value;
    const linkedinInput = document.getElementById('linkedin').value;
    const facebookInput = document.getElementById('facebook').value;
    const profilePictureInput = document.getElementById('picture');
    const educationInput = document.getElementById('education').value;
    const skillsInput = document.getElementById('skills').value;
    const experienceInput = document.getElementById('experience').value;
    const photoFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
    let photoBase64 = '';
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        if (!photoBase64.startsWith('data:image')) {
            photoBase64 = `data:image/jpeg;base64,${photoBase64}`;
        }
        yield saveImageToIndexedDB(photoBase64);
        resumePhoto.src = photoBase64;
    }
    resumeName.textContent = nameInput;
    resumeRole.textContent = roleInput;
    resumeEmail.textContent = emailInput;
    resumePhone.textContent = `${phoneInput}`;
    resumeAddress.textContent = addressInput;
    resumeLinkedin.textContent = linkedinInput;
    resumeFacebook.textContent = facebookInput;
    resumeEducation.textContent = educationInput;
    resumeSkills.textContent = skillsInput;
    resumeExperience.textContent = experienceInput;
    const buttonContainer = document.querySelector('.button1');
    if (buttonContainer) {
        buttonContainer.style.display = 'block';
    }
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
    (_a = document.querySelector('.resume')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    resumePage.classList.remove('hidden');
    (_b = document.querySelector('.button .hidden1')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden1');
    const uniqueUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
    shareLinkButton.addEventListener('click', () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert('Shareable link copied to clipboard!');
    });
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject('Error converting file to Base64');
        reader.readAsDataURL(file);
    });
}
const dbName = 'ResumeDB';
const storeName = 'ProfilePictures';
function saveImageToIndexedDB(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const params = new URLSearchParams(window.location.search);
    if (params.has('resumeName')) {
        resumeName.textContent = params.get('resumeName');
        resumeRole.textContent = params.get('resumeRole');
        resumeEmail.textContent = params.get('resumeEmail');
        resumePhone.textContent = `${params.get('resumePhone')}`;
        resumeAddress.textContent = params.get('resumeAddress');
        resumeEducation.textContent = params.get('resumeEducation');
        resumeSkills.textContent = params.get('resumeSkills');
        resumeExperience.textContent = params.get('resumeExperience');
        const dbRequest = indexedDB.open(dbName, 1);
        dbRequest.onsuccess = () => __awaiter(void 0, void 0, void 0, function* () {
            const db = dbRequest.result;
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const getRequest = store.get(1);
            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resumePhoto.src = getRequest.result.image;
                }
            };
        });
        (_a = document.querySelector('.resume')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        resumePage.classList.remove('hidden');
    }
    resumeEdit.addEventListener('click', () => {
        var _a, _b;
        // Show the form
        (_a = document.querySelector(".resume")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden"); // Show the form
        resumePage.classList.add("hidden"); // Hide the resume preview
        // Populate form fields with existing data
        document.getElementById("name").value = resumeName.textContent || '';
        document.getElementById("role").value = resumeRole.textContent || '';
        document.getElementById("email").value = resumeEmail.textContent || '';
        document.getElementById("phone").value = ((_b = resumePhone.textContent) === null || _b === void 0 ? void 0 : _b.replace('Phone: ', '')) || '';
        document.getElementById("address").value = resumeAddress.textContent || '';
        document.getElementById("linkedin").value = resumeLinkedin.textContent || '';
        document.getElementById("facebook").value = resumeFacebook.textContent || '';
        document.getElementById("education").value = resumeEducation.textContent || '';
        document.getElementById("skills").value = resumeSkills.textContent || '';
        document.getElementById("experience").value = resumeExperience.textContent || '';
    });
    (_b = document.getElementById('download-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        const resumeElement = document.getElementById('resume-page');
        if (resumeElement) {
            console.log("Download button clicked!");
            // Generate the PDF with the desired layout and scaling
            html2pdf()
                .from(resumeElement)
                .set({
                html2canvas: {
                    scale: 0.85, // Reduce scaling to fit content
                },
                jsPDF: {
                    format: 'a4',
                    orientation: 'portrait',
                    unit: 'mm',
                    compressPDF: true,
                }
            })
                .save();
        }
    });
});
