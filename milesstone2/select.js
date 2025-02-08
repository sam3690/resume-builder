var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var form = document.getElementById('resume-form');
var resumePage = document.getElementById('resume-page');
var resumePhoto = document.getElementById('profile-picture');
var resumeName = document.getElementById('resume-name');
var resumeRole = document.getElementById('resume-role');
var resumeEmail = document.getElementById('resume-email');
var resumePhone = document.getElementById('resume-phone');
var resumeFacebook = document.getElementById('resume-facebook');
var resumeLinkedin = document.getElementById('resume-linkedin');
var resumeAddress = document.getElementById('resume-address');
var resumeEducation = document.getElementById('resume-education');
var resumeExperience = document.getElementById('resume-experience');
var resumeEdit = document.getElementById('resume-edit');
var resumeSkills = document.getElementById('resume-skills');
var shareLinkButton = document.getElementById('share-button');
form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, roleInput, emailInput, phoneInput, addressInput, linkedinInput, facebookInput, profilePictureInput, educationInput, skillsInput, experienceInput, photoFile, photoBase64, queryParams, uniqueUrl;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                event.preventDefault();
                nameInput = document.getElementById('name').value;
                roleInput = document.getElementById('role').value;
                emailInput = document.getElementById('email').value;
                phoneInput = document.getElementById('phone').value;
                addressInput = document.getElementById('address').value;
                linkedinInput = document.getElementById('linkedin').value;
                facebookInput = document.getElementById('facebook').value;
                profilePictureInput = document.getElementById('picture');
                educationInput = document.getElementById('education').value;
                skillsInput = document.getElementById('skills').value;
                experienceInput = document.getElementById('experience').value;
                photoFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
                photoBase64 = '';
                if (!photoFile) return [3 /*break*/, 3];
                return [4 /*yield*/, fileToBase64(photoFile)];
            case 1:
                photoBase64 = _c.sent();
                if (!photoBase64.startsWith('data:image')) {
                    photoBase64 = "data:image/jpeg;base64,".concat(photoBase64);
                }
                return [4 /*yield*/, saveImageToIndexedDB(photoBase64)];
            case 2:
                _c.sent();
                resumePhoto.src = photoBase64;
                _c.label = 3;
            case 3:
                // Set Resume Data
                resumeName.textContent = nameInput;
                resumeRole.textContent = roleInput;
                resumeEmail.textContent = emailInput;
                resumePhone.textContent = "Phone: ".concat(phoneInput);
                resumeAddress.textContent = addressInput;
                resumeLinkedin.textContent = linkedinInput;
                resumeFacebook.textContent = facebookInput;
                resumeEducation.textContent = educationInput;
                resumeSkills.textContent = skillsInput;
                resumeExperience.textContent = experienceInput;
                queryParams = new URLSearchParams({
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
                uniqueUrl = "".concat(window.location.origin).concat(window.location.pathname, "?").concat(queryParams.toString());
                window.history.replaceState(null, '', "?".concat(queryParams.toString()));
                shareLinkButton.addEventListener('click', function () {
                    navigator.clipboard.writeText(uniqueUrl);
                    alert('Shareable link copied to clipboard!');
                });
                return [2 /*return*/];
        }
    });
}); });
function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () { return resolve(reader.result); };
        reader.onerror = function () { return reject('Error converting file to Base64'); };
        reader.readAsDataURL(file);
    });
}
var dbName = 'ResumeDB';
var storeName = 'ProfilePictures';
function saveImageToIndexedDB(imageData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var request = indexedDB.open(dbName, 1);
                    request.onupgradeneeded = function () {
                        var db = request.result;
                        if (!db.objectStoreNames.contains(storeName)) {
                            db.createObjectStore(storeName, { keyPath: 'id' });
                        }
                    };
                    request.onsuccess = function () {
                        var db = request.result;
                        var transaction = db.transaction(storeName, 'readwrite');
                        var store = transaction.objectStore(storeName);
                        store.put({ id: 1, image: imageData });
                        resolve('Image saved successfully!');
                    };
                    request.onerror = function () { return reject('Failed to store image.'); };
                })];
        });
    });
}
window.onload = function () { return __awaiter(_this, void 0, void 0, function () {
    var params, dbRequest_1;
    var _this = this;
    var _a;
    return __generator(this, function (_b) {
        params = new URLSearchParams(window.location.search);
        if (params.has('resumeName')) {
            resumeName.textContent = params.get('resumeName');
            resumeRole.textContent = params.get('resumeRole');
            resumeEmail.textContent = params.get('resumeEmail');
            resumePhone.textContent = "Phone: ".concat(params.get('resumePhone'));
            resumeAddress.textContent = params.get('resumeAddress');
            resumeEducation.textContent = params.get('resumeEducation');
            resumeSkills.textContent = params.get('resumeSkills');
            resumeExperience.textContent = params.get('resumeExperience');
            dbRequest_1 = indexedDB.open(dbName, 1);
            dbRequest_1.onsuccess = function () { return __awaiter(_this, void 0, void 0, function () {
                var db, transaction, store, getRequest;
                return __generator(this, function (_a) {
                    db = dbRequest_1.result;
                    transaction = db.transaction(storeName, 'readonly');
                    store = transaction.objectStore(storeName);
                    getRequest = store.get(1);
                    getRequest.onsuccess = function () {
                        if (getRequest.result) {
                            resumePhoto.src = getRequest.result.image;
                        }
                    };
                    return [2 /*return*/];
                });
            }); };
            (_a = document.querySelector('.resume')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            resumePage.classList.remove('hidden');
        }
        return [2 /*return*/];
    });
}); };
