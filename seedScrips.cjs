// Import các hàm của Firebase
// Chúng ta dùng 'require' vì đây là script chạy trên Node.js
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, writeBatch, doc } = require("firebase/firestore");

// Import file data
const fs = require('fs');

// =================================================================
// 1. DÁN firebaseConfig CỦA BẠN VÀO ĐÂY
// (Hãy copy từ file firebaseConfig.js của bạn)
// =================================================================
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// =l================================================================

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Đọc file data
const data = JSON.parse(fs.readFileSync('./seedData.json', 'utf8'));

// Hàm chính để "gieo" dữ liệu
async function seedDatabase() {
    // Lấy ra tất cả các "key" (contracts, marketing, warranties...)
    const collectionNames = Object.keys(data);

    for (const collectionName of collectionNames) {
        // Chúng ta bỏ qua collection 'custom' vì đó là của người dùng
        if (collectionName === 'custom') {
            continue;
        }

        console.log(`Đang gieo dữ liệu cho collection: ${collectionName}...`);

        // Lấy mảng câu hỏi
        const questions = data[collectionName];

        // Dùng WriteBatch để gửi nhiều request cùng lúc, RẤT NHANH
        const batch = writeBatch(db);

        for (const questionData of questions) {
            // Tạo một document mới với ID tự động
            const docRef = doc(collection(db, collectionName));

            // Bỏ trường 'id' cũ từ file JSON đi
            const { id, ...restOfData } = questionData;

            // Thêm document vào batch
            batch.set(docRef, restOfData);
        }

        // Gửi toàn bộ batch lên server
        await batch.commit();
        console.log(`-> Gieo thành công ${questions.length} câu hỏi cho ${collectionName}.`);
    }

    // Đừng quên gieo dữ liệu cho 'topics'
    console.log("Đang gieo dữ liệu cho collection: topics...");
    const topicsBatch = writeBatch(db);

    // Thêm các chủ đề (bỏ 'custom')
    const topics = [
        { name: "Contracts", path: "contracts", isPublic: true },
        { name: "Marketing", path: "marketing", isPublic: true },
        { name: "Warranties", path: "warranties", isPublic: true },
        { name: "Business Planning", path: "businessPlanning", isPublic: true },
        { name: "Conferences", path: "conferences", isPublic: true },
        { name: "Computers", path: "computers", isPublic: true },
        { name: "Office Technology", path: "officeTechnology", isPublic: true },
        { name: "Office Procedures", path: "officeProcedures", isPublic: true },
        { name: "Electronics", path: "electronics", isPublic: true },
        { name: "Correspondence", path: "correspondence", isPublic: true },
        { name: "Job Advertising&Recruiting", path: "jobAdvertisingAndRecruiting", isPublic: true },
        { name: "Applying&Interviewing", path: "applyingAndInterviewing", isPublic: true },
        { name: "Hiring&Training", path: "hiringAndTraining", isPublic: true },
        { name: "Salaries&Benefits", path: "salariesAndBenefits", isPublic: true },
        { name: "Promotions", path: "promotions", isPublic: true },
        { name: "Shopping", path: "shopping", isPublic: true },
        { name: "Ordering Supplies", path: "orderingSupplies", isPublic: true },
        { name: "Shipping", path: "shipping", isPublic: true },
        { name: "Invoices", path: "invoices", isPublic: true },
        { name: "Inventory", path: "inventory", isPublic: true },
        { name: "Banking", path: "banking", isPublic: true },
        { name: "Accounting", path: "accounting", isPublic: true },
        { name: "Investments", path: "investments", isPublic: true },
        { name: "Taxes", path: "taxes", isPublic: true },
        { name: "Financial Statements", path: "financialStatements", isPublic: true },
        { name: "Property&Departments", path: "propertyAndDepartments", isPublic: true },
        { name: "BoardMeetings&Committees", path: "boardMeetingsAndCommittees", isPublic: true },
        { name: "Quality Control", path: "qualityControl", isPublic: true },
        { name: "Product Development", path: "productDevelopment", isPublic: true }
    ];

    topics.forEach(topic => {
        const docRef = doc(collection(db, "topics"));
        topicsBatch.set(docRef, topic);
    });

    await topicsBatch.commit();
    console.log(`-> Gieo thành công ${topics.length} chủ đề.`);
    console.log("Database seeding complete!");
}

// Chạy hàm
seedDatabase().catch(console.error);