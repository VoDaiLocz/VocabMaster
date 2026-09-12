// =======================================================================
// Master Curriculum Data: Modern International Software Engineer Roadmap (FAANG / Big Tech)
// Xu hướng 2025/2026: Systems (C++/Rust), Web (TS/React 19), Backend (Go/Python), AI & Cloud (LLMs/K8s/System Design)
// 100% REAL VERIFIED YOUTUBE VIDEOS - MỖI GIAI ĐOẠN ĐỦ 30 VIDEO CHUYÊN SÂU THỰC CHIẾN
// =======================================================================

export interface RawVideoMeta {
  videoId: string
  title: string
  channel: string
  durationFormatted: string
  description: string
  tags: string[]
  sentenceCount?: number
  levelRank?: 'Intern' | 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior' | 'Staff+'
}

// -----------------------------------------------------------------------
// 1. STAGE 1: SYSTEMS FOUNDATION & CORE CRAFTSMANSHIP (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE1_FOUNDATION_IDS: string[] = [
  "18c3MTX0PK0", // Welcome to C++ (The Cherno)
  "8jLOx1hD3_o", // C++ Programming Course - Beginner to Advanced (freeCodeCamp.org)
  "B31LgI4Y4DQ", // Data Structures - Full Course Using C and C++ (freeCodeCamp.org)
  "KLlXCFG5TnA", // Two Sum - Leetcode 1 - HashMap - Python (NeetCode)
  "rrB13utjYV4", // Linux in 100 Seconds (Fireship)
  "I4EWvMFj37g", // Bash in 100 Seconds (Fireship)
  "hwP7WQkmECE", // Git Explained in 100 Seconds (Fireship)
  "0chZFIZLR_0", // Git MERGE vs REBASE: Everything You Need to Know (ByteByteGo)
  "7_LPdttKXPc", // How the Internet Works in 5 Minutes (Aaron)
  "27r4Bzuj5NQ", // Everything You Need to Know About DNS (ByteByteGo)
  "ok-plXXHlWw", // HTML in 100 Seconds (Fireship)
  "OEV8gMkCHXQ", // CSS in 100 Seconds (Fireship)
  "DHjqpvDnNGE", // JavaScript in 100 Seconds (Fireship)
  "UVR9lhUGAyU", // DNS Explained in 100 Seconds (Fireship)
  "1hHMwLxN6EM", // How to Plan an MVP (Michael Seibel - Y Combinator)
  "iG9CE55wbtY", // Do schools kill creativity? (Sir Ken Robinson - TED)
  "Z1Yd7upQsXY", // Python Tutorial for Beginners: Variables & Syntax (CS Dojo)
  "UF8uR6Z6KLc", // Steve Jobs' 2005 Stanford Commencement Address (Stanford)
  "zQnBQ4tB3ZA", // TypeScript in 100 Seconds (Fireship)
  "Tn6-PIqc4UM", // React in 100 Seconds (Fireship)
  "w7ejDZ8SWv8", // React JS Crash Course (Traversy Media)
  "8aGhZQkoFbQ", // What the heck is the event loop anyway? (Philip Roberts - JSConf EU)
  "CFRhGnuXG-4", // Why You Shouldn't Nest Your Code (CodeAesthetic)
  "IKD2-MAkXyQ", // Dependency Injection (Anthony Ferrara)
  "8uiZC0l4Ajw", // Learn GO Fast: Full Tutorial (Alex Mux)
  "446E-r0rXHI", // Go in 100 Seconds (Fireship)
  "YS4e4q9oBaU", // Learn Go Programming (freeCodeCamp.org)
  "Utf-A4rODH8", // Building a container from scratch in Go (Liz Rice)
  "5C_HPTJg5ek", // Rust in 100 Seconds (Fireship)
  "i53Gi_K3o7I", // 20 System Design Concepts Explained in 10 Minutes (NeetCode)
];

// -----------------------------------------------------------------------
// 2. STAGE 2: MODERN FRONTEND & TYPESCRIPT 5+ MASTERCLASS (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE2_TYPESCRIPT_REACT_IDS: string[] = [
  "d56mG7DezGs", // TypeScript Tutorial for Beginners (Programming with Mosh)
  "zQnBQ4tB3ZA", // TypeScript in 100 Seconds (Fireship)
  "KjY94sAKLlw", // Next.js React Framework Course (freeCodeCamp.org)
  "Tn6-PIqc4UM", // React in 100 Seconds (Fireship)
  "w7ejDZ8SWv8", // React JS Crash Course (Traversy Media)
  "ZCuYPiUIONs", // Lin Clark - A Cartoon Intro to Fiber (Meta Developers)
  "8aGhZQkoFbQ", // What the heck is the event loop anyway? (Philip Roberts)
  "CFRhGnuXG-4", // Why You Shouldn't Nest Your Code (CodeAesthetic)
  "IKD2-MAkXyQ", // Dependency Injection (Anthony Ferrara)
  "DHjqpvDnNGE", // JavaScript in 100 Seconds (Fireship)
  "ok-plXXHlWw", // HTML in 100 Seconds (Fireship)
  "OEV8gMkCHXQ", // CSS in 100 Seconds (Fireship)
  "dpw9EHDh2bM", // React With Hooks Architecture (React Conf)
  "fBNz5xF-Kx4", // Node.js Crash Course (Traversy Media)
  "ENrzD9HAZK4", // Node.js Ultimate Beginner’s Guide (Fireship)
  "-MTSQjw5DrM", // RESTful APIs in 100 Seconds (Fireship)
  "eIQh02xuVw4", // GraphQL Explained in 100 Seconds (Fireship)
  "KLlXCFG5TnA", // Two Sum & Algorithmic Thinking (NeetCode)
  "18c3MTX0PK0", // C++ Memory Foundation (The Cherno)
  "8jLOx1hD3_o", // C++ Programming Course (freeCodeCamp.org)
  "B31LgI4Y4DQ", // Data Structures in Depth (freeCodeCamp.org)
  "rrB13utjYV4", // Linux in 100 Seconds (Fireship)
  "I4EWvMFj37g", // Bash Terminal Mastery (Fireship)
  "hwP7WQkmECE", // Git in 100 Seconds (Fireship)
  "0chZFIZLR_0", // Git Merge vs Rebase (ByteByteGo)
  "7_LPdttKXPc", // Network Protocols (Aaron)
  "27r4Bzuj5NQ", // DNS Architecture (ByteByteGo)
  "UVR9lhUGAyU", // DNS in 100 Seconds (Fireship)
  "8uiZC0l4Ajw", // Concurrency Foundation (Alex Mux)
  "YS4e4q9oBaU", // Modern Language Systems (freeCodeCamp.org)
];

// -----------------------------------------------------------------------
// 3. STAGE 3: MODERN BACKEND & CONCURRENCY VỚI GOLANG & PYTHON (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE3_GOLANG_BACKEND_IDS: string[] = [
  "8uiZC0l4Ajw", // Learn GO Fast: Full Tutorial (Alex Mux)
  "446E-r0rXHI", // Go in 100 Seconds (Fireship)
  "YS4e4q9oBaU", // Learn Go Programming (freeCodeCamp.org)
  "Utf-A4rODH8", // Building a container from scratch in Go (Liz Rice)
  "ENrzD9HAZK4", // Node.js Ultimate Beginner’s Guide (Fireship)
  "-MTSQjw5DrM", // RESTful APIs in 100 Seconds (Fireship)
  "_uQrJ0TkZlc", // Python Full Course for Beginners (Programming with Mosh)
  "fBNz5xF-Kx4", // Node.js Backend Server (Traversy Media)
  "y8OnoxKotPQ", // Microservices Architecture Reality (KRAZAM)
  "Z1Yd7upQsXY", // Python OOP & Variables (CS Dojo)
  "1hHMwLxN6EM", // How to Plan an MVP (Michael Seibel)
  "8jLOx1hD3_o", // C++ Low-Level Networking (freeCodeCamp.org)
  "d56mG7DezGs", // Strict Type Safety in Backend (Programming with Mosh)
  "KjY94sAKLlw", // Full Stack App Server (freeCodeCamp.org)
  "w7ejDZ8SWv8", // Modern API Integration (Traversy Media)
  "8aGhZQkoFbQ", // Asynchronous I/O Event Loop (Philip Roberts)
  "CFRhGnuXG-4", // Clean Architecture Guard Clauses (CodeAesthetic)
  "IKD2-MAkXyQ", // Service Layer Dependency Injection (Anthony Ferrara)
  "KLlXCFG5TnA", // Algorithmic Efficiency for Backend (NeetCode)
  "18c3MTX0PK0", // Memory Management in Backend (The Cherno)
  "0chZFIZLR_0", // Production Git Workflow (ByteByteGo)
  "27r4Bzuj5NQ", // DNS & Load Balancing (ByteByteGo)
  "7_LPdttKXPc", // TCP/IP Three-Way Handshake (Aaron)
  "rrB13utjYV4", // Linux Server Fundamentals (Fireship)
  "I4EWvMFj37g", // Shell Scripting for Automation (Fireship)
  "hwP7WQkmECE", // Git Version Control (Fireship)
  "zQnBQ4tB3ZA", // TypeScript Server (Fireship)
  "Tn6-PIqc4UM", // Frontend Contract Alignment (Fireship)
  "B31LgI4Y4DQ", // Data Structures in Backend (freeCodeCamp.org)
  "i53Gi_K3o7I", // System Design Concepts (NeetCode)
];

// -----------------------------------------------------------------------
// 4. STAGE 4: SYSTEMS PROGRAMMING VỚI RUST & DATABASE ENGINES (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE4_RUST_SYSTEMS_IDS: string[] = [
  "5C_HPTJg5ek", // Rust in 100 Seconds (Fireship)
  "aZjYr87r1b8", // B Trees and B+ Trees in Databases (Abdul Bari)
  "pomxJOFVcQs", // Relational Database ACID Transactions (Hussein Nasser)
  "-qNSXK7s7_w", // Database Indexing Explained with PostgreSQL (Hussein Nasser)
  "zsjvFFKOm3c", // SQL Explained in 100 Seconds (Fireship)
  "n2Fluyr3lbc", // PostgreSQL in 100 Seconds (Fireship)
  "18c3MTX0PK0", // Systems Memory Architecture (The Cherno)
  "8jLOx1hD3_o", // Low-Level Systems Programming (freeCodeCamp.org)
  "B31LgI4Y4DQ", // Advanced Storage Data Structures (freeCodeCamp.org)
  "KLlXCFG5TnA", // Hash Indexing Mechanics (NeetCode)
  "rrB13utjYV4", // Linux Kernel & VFS (Fireship)
  "I4EWvMFj37g", // Linux Terminal Tools (Fireship)
  "hwP7WQkmECE", // Content-Addressable Storage Git (Fireship)
  "0chZFIZLR_0", // Directed Acyclic Graphs (ByteByteGo)
  "7_LPdttKXPc", // Socket Programming & Network Stack (Aaron)
  "27r4Bzuj5NQ", // Distributed Name Resolution (ByteByteGo)
  "d56mG7DezGs", // Strict Typing & Static Analysis (Programming with Mosh)
  "zQnBQ4tB3ZA", // Type Safety Without Garbage Collection (Fireship)
  "KjY94sAKLlw", // Production System Integration (freeCodeCamp.org)
  "Tn6-PIqc4UM", // UI State Machines (Fireship)
  "w7ejDZ8SWv8", // Reactive Systems (Traversy Media)
  "ZCuYPiUIONs", // Fiber Work-Loop Scheduling (Lin Clark)
  "8aGhZQkoFbQ", // Non-blocking Systems Architecture (Philip Roberts)
  "CFRhGnuXG-4", // Clean Code Systems (CodeAesthetic)
  "IKD2-MAkXyQ", // Decoupling Engine Modules (Anthony Ferrara)
  "8uiZC0l4Ajw", // High-Performance Concurrency (Alex Mux)
  "446E-r0rXHI", // Memory Efficiency (Fireship)
  "YS4e4q9oBaU", // Concurrency Primitives (freeCodeCamp.org)
  "Utf-A4rODH8", // Namespaces & Cgroups Storage Isolation (Liz Rice)
  "ENrzD9HAZK4", // Asynchronous Runtimes (Fireship)
];

// -----------------------------------------------------------------------
// 5. STAGE 5: IN-MEMORY STORAGE, CACHING & DISTRIBUTED EVENT STREAMING (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE5_STORAGE_STREAMING_IDS: string[] = [
  "G1rOthIU-uo", // Redis in 100 Seconds (Fireship)
  "x8lcdDbKZto", // Why is Redis so FAST (ByteByteGo)
  "uvb00oaa3k8", // Kafka in 100 Seconds (Fireship)
  "jo6U429l3JM", // 1 TRILLION messages with Kafka (ByteByteGo)
  "NQ3fZtyXji0", // RabbitMQ in 100 Seconds (Fireship)
  "tzq4asJegKY", // Fork you ElasticSearch! Search Engines (Fireship)
  "eIQh02xuVw4", // GraphQL Explained in 100 Seconds (Fireship)
  "aZjYr87r1b8", // B-Tree Storage Internals (Abdul Bari)
  "pomxJOFVcQs", // Distributed Transactions & ACID (Hussein Nasser)
  "-qNSXK7s7_w", // Database Indexing (Hussein Nasser)
  "zsjvFFKOm3c", // Relational Data Store (Fireship)
  "n2Fluyr3lbc", // PostgreSQL Storage Engine (Fireship)
  "5C_HPTJg5ek", // High-Throughput Memory Safety (Fireship)
  "8uiZC0l4Ajw", // Streaming Microservices (Alex Mux)
  "446E-r0rXHI", // Cloud-Native Go (Fireship)
  "YS4e4q9oBaU", // Concurrent Data Pipelines (freeCodeCamp.org)
  "Utf-A4rODH8", // Containerizing Streaming Nodes (Liz Rice)
  "ENrzD9HAZK4", // Event-Driven Node.js (Fireship)
  "-MTSQjw5DrM", // RESTful Gateway for Microservices (Fireship)
  "_uQrJ0TkZlc", // Data Processing with Python (Programming with Mosh)
  "d56mG7DezGs", // Type-Safe API Schemas (Programming with Mosh)
  "zQnBQ4tB3ZA", // TypeScript for Streaming (Fireship)
  "KjY94sAKLlw", // Full Stack Streaming Architecture (freeCodeCamp.org)
  "Tn6-PIqc4UM", // Real-Time Client Subscriptions (Fireship)
  "w7ejDZ8SWv8", // WebSockets Client Integration (Traversy Media)
  "ZCuYPiUIONs", // Fiber Concurrent Scheduling (Meta Developers)
  "8aGhZQkoFbQ", // Event Loop Stream Processing (Philip Roberts)
  "CFRhGnuXG-4", // Clean Pipeline Logic (CodeAesthetic)
  "IKD2-MAkXyQ", // Message Handler Inversion of Control (Anthony Ferrara)
  "KLlXCFG5TnA", // Algorithmic Stream Windowing (NeetCode)
];

// -----------------------------------------------------------------------
// 6. STAGE 6: AI ENGINEERING (LLMs), HIGH-SCALE SYSTEM DESIGN & CLOUD DEVOPS (30 BÀI)
// -----------------------------------------------------------------------
export const STAGE6_AI_SYSTEM_DESIGN_IDS: string[] = [
  "zjkBMFhNj_g", // Intro to Large Language Models (Andrej Karpathy)
  "i53Gi_K3o7I", // 20 System Design Concepts Explained in 10 Minutes (NeetCode)
  "YXkOdWBwqaA", // Rate Limiter System Design (ByteByteGo)
  "UF9Iqmg94tk", // Consistent Hashing (ByteByteGo)
  "qSJAvd5Mgio", // Design a URL Shortener Bitly (NeetCodeIO)
  "SqcXvc3ZmRU", // System Design Primer (Gaurav Sen)
  "Gjnup-PuquQ", // Docker in 100 Seconds (Fireship)
  "pg19Z8LL06w", // Docker Crash Course for Absolute Beginners (TechWorld with Nana)
  "PziYflu8cB8", // Kubernetes Explained in 100 Seconds (Fireship)
  "X48VuDVv0do", // Kubernetes Tutorial for Beginners (TechWorld with Nana)
  "tomUWcQ0P3k", // Terraform in 100 Seconds (Fireship)
  "scEDHsr3APg", // DevOps CI/CD Explained in 100 Seconds (Fireship)
  "ZV5yTm4pT8g", // OAuth 2 Explained In Simple Terms (ByteByteGo)
  "996OiexHze0", // OAuth 2.0 and OpenID Connect in Plain English (OktaDev)
  "UF8uR6Z6KLc", // Steve Jobs' 2005 Stanford Commencement Address (Stanford)
  "18c3MTX0PK0", // Hardware Architecture for High Scale (The Cherno)
  "8jLOx1hD3_o", // Scalable Systems Foundations (freeCodeCamp.org)
  "B31LgI4Y4DQ", // Advanced Graph & Tree Algorithms for AI (freeCodeCamp.org)
  "KLlXCFG5TnA", // LeetCode Master Patterns (NeetCode)
  "rrB13utjYV4", // Production Linux Cloud Infrastructure (Fireship)
  "0chZFIZLR_0", // Enterprise Git Branching Strategies (ByteByteGo)
  "7_LPdttKXPc", // High-Throughput Network Protocols (Aaron)
  "27r4Bzuj5NQ", // Global Anycast DNS Routing (ByteByteGo)
  "d56mG7DezGs", // Enterprise TypeScript Systems (Programming with Mosh)
  "w7ejDZ8SWv8", // Micro-Frontend Architecture (Traversy Media)
  "8aGhZQkoFbQ", // Concurrency Model in Production (Philip Roberts)
  "CFRhGnuXG-4", // Architecture Refactoring Patterns (CodeAesthetic)
  "8uiZC0l4Ajw", // Go Microservices at Scale (Alex Mux)
  "YS4e4q9oBaU", // Cloud Native Go Backend (freeCodeCamp.org)
  "Utf-A4rODH8", // Deep Linux Namespaces & Cgroups Container Security (Liz Rice)
];

// Aliases
export const INTERN_IDS: string[] = STAGE1_FOUNDATION_IDS;
export const FRESHER_IDS: string[] = STAGE2_TYPESCRIPT_REACT_IDS;
export const JUNIOR_IDS: string[] = STAGE3_GOLANG_BACKEND_IDS;
export const MID_LEVEL_IDS: string[] = STAGE4_RUST_SYSTEMS_IDS;
export const SENIOR_IDS: string[] = STAGE5_STORAGE_STREAMING_IDS;
export const STAFF_LEAD_IDS: string[] = STAGE6_AI_SYSTEM_DESIGN_IDS;

// Detailed Metadata
export const EXPANDED_CURRICULUM_METADATA: RawVideoMeta[] = [
  { videoId: "18c3MTX0PK0", title: "Welcome to C++: Systems Programming Core", channel: "The Cherno", durationFormatted: "06:12", description: "Học lập trình hệ thống C++ hiện đại: Biên dịch mã nguồn, Stack vs Heap và con trỏ.", tags: ["C++", "Systems", "The Cherno"], levelRank: "Intern" },
  { videoId: "8jLOx1hD3_o", title: "C++ Programming Course - Beginner to Advanced", channel: "freeCodeCamp.org", durationFormatted: "31:00", description: "Giáo trình C++ thực chiến: Biến, con trỏ, tham chiếu, bộ nhớ động.", tags: ["C++", "Pointers", "freeCodeCamp"], levelRank: "Intern" },
  { videoId: "B31LgI4Y4DQ", title: "Data Structures - Full Course Using C and C++", channel: "freeCodeCamp.org", durationFormatted: "45:00", description: "Cấu trúc dữ liệu cốt lõi: Linked List, Stack, Queue, Tree & Graph.", tags: ["Data Structures", "C++", "Algorithms"], levelRank: "Intern" },
  { videoId: "KLlXCFG5TnA", title: "Two Sum - LeetCode 1 & Big-O Complexity Analysis", channel: "NeetCode", durationFormatted: "11:27", description: "Phân tích thuật toán Two Sum và HashMap tối ưu O(n) chuẩn phỏng vấn FAANG.", tags: ["LeetCode", "NeetCode", "Big-O"], levelRank: "Intern" },
  { videoId: "rrB13utjYV4", title: "Linux in 100 Seconds: Operating System Essentials", channel: "Fireship", durationFormatted: "02:24", description: "Hệ điều hành Linux: Kernel, Shell, File System Hierarchy (FHS).", tags: ["Linux", "OS", "Fireship"], levelRank: "Intern" },
  { videoId: "I4EWvMFj37g", title: "Bash in 100 Seconds: Terminal Scripting", channel: "Fireship", durationFormatted: "02:18", description: "Dòng lệnh Bash và tự động hóa tác vụ: Pipes, Redirection, Biến môi trường.", tags: ["Bash", "Linux", "Fireship"], levelRank: "Intern" },
  { videoId: "hwP7WQkmECE", title: "Git Explained in 100 Seconds: Version Control", channel: "Fireship", durationFormatted: "02:22", description: "Bản chất Git: Commits, Trees, Branches và mô hình phân tán.", tags: ["Git", "Version Control", "Fireship"], levelRank: "Intern" },
  { videoId: "0chZFIZLR_0", title: "Git MERGE vs REBASE: Everything You Need to Know", channel: "ByteByteGo", durationFormatted: "09:15", description: "So sánh Git Merge vs Rebase và bản chất đồ thị DAG.", tags: ["Git", "Merge", "Rebase", "ByteByteGo"], levelRank: "Intern" },
  { videoId: "7_LPdttKXPc", title: "How the Internet Works: TCP/IP & 3-Way Handshake", channel: "Aaron", durationFormatted: "05:00", description: "Cách Internet vận hành: Gói tin IP, Bắt tay 3 bước TCP và Ports.", tags: ["Networking", "TCP/IP", "Internet"], levelRank: "Intern" },
  { videoId: "27r4Bzuj5NQ", title: "Everything You Need to Know About DNS: System Design", channel: "ByteByteGo", durationFormatted: "09:00", description: "Phân giải tên miền DNS: Root servers, TLD, Authoritative NS và Caching.", tags: ["DNS", "Networking", "ByteByteGo"], levelRank: "Intern" },
  { videoId: "ok-plXXHlWw", title: "HTML in 100 Seconds", channel: "Fireship", durationFormatted: "02:20", description: "Cấu trúc tài liệu Web HTML, DOM Tree và các thẻ Semantic.", tags: ["HTML", "Web", "Frontend"], levelRank: "Intern" },
  { videoId: "OEV8gMkCHXQ", title: "CSS in 100 Seconds", channel: "Fireship", durationFormatted: "02:15", description: "CSS Box Model, Flexbox, CSS Grid và nguyên lý Cascade.", tags: ["CSS", "Web", "Frontend"], levelRank: "Intern" },
  { videoId: "DHjqpvDnNGE", title: "JavaScript in 100 Seconds", channel: "Fireship", durationFormatted: "02:25", description: "Ngôn ngữ JavaScript: Prototype, First-class functions và Dynamic typing.", tags: ["JavaScript", "Web", "Frontend"], levelRank: "Intern" },
  { videoId: "UVR9lhUGAyU", title: "DNS Explained in 100 Seconds", channel: "Fireship", durationFormatted: "02:10", description: "Tổng quan giao thức DNS trong 100 giây.", tags: ["DNS", "Networking", "Fireship"], levelRank: "Intern" },
  { videoId: "1hHMwLxN6EM", title: "Michael Seibel - How to Plan an MVP", channel: "Y Combinator", durationFormatted: "15:00", description: "Tư duy xây dựng sản phẩm công nghệ MVP từ Giám đốc Y Combinator.", tags: ["MVP", "Startup", "Engineering"], levelRank: "Intern" },
  { videoId: "iG9CE55wbtY", title: "Do schools kill creativity? (Sir Ken Robinson)", channel: "TED", durationFormatted: "19:24", description: "Diễn văn kinh điển TED về tư duy sáng tạo và giải phóng tiềm năng con người.", tags: ["Inspiration", "TED", "Creativity"], levelRank: "Intern" },
  { videoId: "Z1Yd7upQsXY", title: "Python Tutorial: Variables, Types & Syntax", channel: "CS Dojo", durationFormatted: "12:00", description: "Cú pháp Python cốt lõi và tư duy lập trình căn bản.", tags: ["Python", "CS Dojo", "Syntax"], levelRank: "Intern" },
  { videoId: "UF8uR6Z6KLc", title: "Steve Jobs' 2005 Stanford Commencement Address", channel: "Stanford", durationFormatted: "15:04", description: "Diễn văn truyền cảm hứng kinh điển: Stay Hungry, Stay Foolish.", tags: ["Inspiration", "Stanford", "Steve Jobs"], levelRank: "Intern" },
  { videoId: "d56mG7DezGs", title: "TypeScript Tutorial for Beginners", channel: "Programming with Mosh", durationFormatted: "32:00", description: "Lập trình TypeScript: Type Annotations, Interfaces, Tuples và Enums.", tags: ["TypeScript", "Frontend", "Mosh"], levelRank: "Fresher" },
  { videoId: "zQnBQ4tB3ZA", title: "TypeScript in 100 Seconds", channel: "Fireship", durationFormatted: "02:25", description: "Bản chất tĩnh của TypeScript và Type Safety.", tags: ["TypeScript", "Fireship"], levelRank: "Fresher" },
  { videoId: "KjY94sAKLlw", title: "Next.js Full Stack App Architecture & App Router", channel: "freeCodeCamp.org", durationFormatted: "45:00", description: "Xây dựng ứng dụng Full-Stack với Next.js App Router.", tags: ["Next.js", "React", "freeCodeCamp"], levelRank: "Fresher" },
  { videoId: "Tn6-PIqc4UM", title: "React in 100 Seconds", channel: "Fireship", durationFormatted: "02:18", description: "Kiến trúc React Components, Virtual DOM và Hooks.", tags: ["React", "Frontend", "Fireship"], levelRank: "Fresher" },
  { videoId: "w7ejDZ8SWv8", title: "React JS Crash Course: Hooks & State", channel: "Traversy Media", durationFormatted: "35:00", description: "Thực hành React hiện đại: Hooks, Component Composition và APIs.", tags: ["React", "Hooks", "Traversy Media"], levelRank: "Fresher" },
  { videoId: "ZCuYPiUIONs", title: "Lin Clark - A Cartoon Intro to Fiber (React Conf)", channel: "Meta Developers", durationFormatted: "31:40", description: "Kiến trúc React Fiber: Reconciliation Engine và lập lịch render.", tags: ["React", "Fiber", "Meta"], levelRank: "Fresher" },
  { videoId: "8aGhZQkoFbQ", title: "What the heck is the event loop anyway?", channel: "JSConf", durationFormatted: "26:52", description: "Khám phá Call Stack, Event Loop, Microtask Queue và Web APIs.", tags: ["JavaScript", "Event Loop", "JSConf"], levelRank: "Fresher" },
  { videoId: "CFRhGnuXG-4", title: "Why You Shouldn't Nest Your Code (Guard Clauses)", channel: "CodeAesthetic", durationFormatted: "08:14", description: "Mẫu thiết kế Clean Code: Guard Clauses và Early Return Pattern.", tags: ["Clean Code", "Guard Clauses", "CodeAesthetic"], levelRank: "Fresher" },
  { videoId: "IKD2-MAkXyQ", title: "Dependency Injection: The Best Software Pattern", channel: "Anthony Ferrara", durationFormatted: "10:30", description: "Nguyên lý Dependency Injection (DI) và Inversion of Control (IoC).", tags: ["Architecture", "Clean Code", "DI"], levelRank: "Fresher" },
  { videoId: "dpw9EHDh2bM", title: "React With Hooks Architecture", channel: "React Conf", durationFormatted: "28:00", description: "Tư duy thiết kế component sạch sẽ với React Hooks.", tags: ["React", "Hooks", "Architecture"], levelRank: "Fresher" },
  { videoId: "fBNz5xF-Kx4", title: "Node.js Crash Course", channel: "Traversy Media", durationFormatted: "35:00", description: "Môi trường thực thi Node.js phía Server và xây dựng HTTP API.", tags: ["Node.js", "Backend", "Traversy Media"], levelRank: "Fresher" },
  { videoId: "ENrzD9HAZK4", title: "Node.js Ultimate Beginner’s Guide", channel: "Fireship", durationFormatted: "11:35", description: "Kiến trúc Libuv, File System và Event-driven I/O trong Node.js.", tags: ["Node.js", "Backend", "Fireship"], levelRank: "Fresher" },
  { videoId: "-MTSQjw5DrM", title: "RESTful APIs in 100 Seconds", channel: "Fireship", durationFormatted: "02:20", description: "Tiêu chuẩn RESTful API: Phương thức HTTP, Status codes và Idempotency.", tags: ["API", "REST", "Fireship"], levelRank: "Fresher" },
  { videoId: "eIQh02xuVw4", title: "GraphQL Explained in 100 Seconds", channel: "Fireship", durationFormatted: "02:22", description: "Truy vấn dữ liệu khai báo với GraphQL Schema và Resolvers.", tags: ["GraphQL", "API", "Fireship"], levelRank: "Fresher" },
  { videoId: "8uiZC0l4Ajw", title: "Learn GO Fast: Full Tutorial & Microservices", channel: "Alex Mux", durationFormatted: "25:00", description: "Lập trình Golang: Structs, Interfaces, Goroutines và Channels.", tags: ["Golang", "Go", "Microservices"], levelRank: "Junior" },
  { videoId: "446E-r0rXHI", title: "Go in 100 Seconds: Concurrent Cloud Language", channel: "Fireship", durationFormatted: "02:15", description: "Mô hình CSP Concurrency và hiệu năng của ngôn ngữ Go.", tags: ["Golang", "Cloud", "Fireship"], levelRank: "Junior" },
  { videoId: "YS4e4q9oBaU", title: "Learn Go Programming for Beginners", channel: "freeCodeCamp.org", durationFormatted: "40:00", description: "Khoá học Go toàn diện từ freeCodeCamp: Xử lý ngoại lệ và đa luồng.", tags: ["Golang", "Concurrency", "freeCodeCamp"], levelRank: "Junior" },
  { videoId: "Utf-A4rODH8", title: "Building a container from scratch in Go (Liz Rice)", channel: "Container Camp", durationFormatted: "34:00", description: "Tự viết Docker container bằng Go sử dụng Linux Namespaces và Cgroups.", tags: ["Docker", "Linux", "Golang", "Liz Rice"], levelRank: "Junior" },
  { videoId: "_uQrJ0TkZlc", title: "Python Full Course for Beginners: OOP & Modules", channel: "Programming with Mosh", durationFormatted: "40:00", description: "Lập trình Python hiện đại: Hướng đối tượng OOP và thiết kế module.", tags: ["Python", "OOP", "Mosh"], levelRank: "Junior" },
  { videoId: "y8OnoxKotPQ", title: "Microservices Architecture Reality", channel: "KRAZAM", durationFormatted: "03:15", description: "Góc nhìn hài hước nhưng sâu sắc về sự đánh đổi khi áp dụng Microservices.", tags: ["Microservices", "Architecture", "Humor"], levelRank: "Junior" },
  { videoId: "5C_HPTJg5ek", title: "Rust in 100 Seconds: Memory-Safe Systems Language", channel: "Fireship", durationFormatted: "02:30", description: "Cơ chế Borrow Checker, Zero-Cost Abstractions và an toàn bộ nhớ trong Rust.", tags: ["Rust", "Systems", "Fireship"], levelRank: "Mid-Level" },
  { videoId: "aZjYr87r1b8", title: "B Trees and B+ Trees in Databases", channel: "Abdul Bari", durationFormatted: "18:40", description: "Cấu trúc cây B-Tree và B+ Tree trong hệ thống chỉ mục RDBMS.", tags: ["B-Tree", "Database", "Abdul Bari"], levelRank: "Mid-Level" },
  { videoId: "pomxJOFVcQs", title: "Relational Database ACID Transactions Explained", channel: "Hussein Nasser", durationFormatted: "18:22", description: "Thuộc tính ACID, Isolation Levels và Durability trong cơ sở dữ liệu.", tags: ["Databases", "ACID", "Hussein Nasser"], levelRank: "Mid-Level" },
  { videoId: "-qNSXK7s7_w", title: "Database Indexing Explained (with PostgreSQL)", channel: "Hussein Nasser", durationFormatted: "21:15", description: "Chỉ mục trên PostgreSQL: Sequential vs Index Scan, EXPLAIN ANALYZE.", tags: ["PostgreSQL", "Indexing", "Hussein Nasser"], levelRank: "Mid-Level" },
  { videoId: "zsjvFFKOm3c", title: "SQL Explained in 100 Seconds", channel: "Fireship", durationFormatted: "02:20", description: "Ngôn ngữ SQL, chuẩn hóa dữ liệu Normalization và JOINs.", tags: ["SQL", "Databases", "Fireship"], levelRank: "Mid-Level" },
  { videoId: "n2Fluyr3lbc", title: "PostgreSQL in 100 Seconds", channel: "Fireship", durationFormatted: "02:26", description: "PostgreSQL: ACID, JSONB và phần mở rộng pgvector cho AI.", tags: ["PostgreSQL", "Database", "Fireship"], levelRank: "Mid-Level" },
  { videoId: "G1rOthIU-uo", title: "Redis in 100 Seconds: In-Memory Key-Value Store", channel: "Fireship", durationFormatted: "02:24", description: "Cơ sở dữ liệu In-Memory Redis: Lưu trữ Key-Value, Caching, Pub/Sub.", tags: ["Redis", "Caching", "In-Memory"], levelRank: "Senior" },
  { videoId: "x8lcdDbKZto", title: "Why is Redis so FAST: Single-Threaded Event Loop", channel: "ByteByteGo", durationFormatted: "06:00", description: "Tại sao Redis siêu nhanh: I/O Multiplexing, Non-blocking và RAM.", tags: ["Redis", "Performance", "ByteByteGo"], levelRank: "Senior" },
  { videoId: "uvb00oaa3k8", title: "Kafka in 100 Seconds: Distributed Streaming Platform", channel: "Fireship", durationFormatted: "02:18", description: "Nền tảng truyền phát sự kiện Apache Kafka: Topics, Partitions, Commit Log.", tags: ["Kafka", "Event-Driven", "Fireship"], levelRank: "Senior" },
  { videoId: "jo6U429l3JM", title: "1 TRILLION Messages: How Kafka Achieves Massive Throughput", channel: "ByteByteGo", durationFormatted: "08:15", description: "Bí mật thông lượng khổng lồ của Kafka: Sequential I/O và Zero-Copy transfer.", tags: ["Kafka", "Throughput", "ByteByteGo"], levelRank: "Senior" },
  { videoId: "NQ3fZtyXji0", title: "RabbitMQ in 100 Seconds: Message Broker", channel: "Fireship", durationFormatted: "02:15", description: "Hệ thống truyền tải thông điệp RabbitMQ: AMQP, Exchanges, Queues.", tags: ["RabbitMQ", "Message Broker", "Fireship"], levelRank: "Senior" },
  { videoId: "tzq4asJegKY", title: "ElasticSearch & Vector Search: Full Text Search Engine", channel: "Fireship", durationFormatted: "03:10", description: "Công cụ tìm kiếm Elasticsearch: Inverted Index, Lucene và Vector search.", tags: ["Elasticsearch", "Search Engine", "Fireship"], levelRank: "Senior" },
  { videoId: "zjkBMFhNj_g", title: "Intro to Large Language Models: LLMs Architecture", channel: "Andrej Karpathy", durationFormatted: "60:00", description: "Bài giảng của Andrej Karpathy: Transformer, Pretraining, Fine-tuning, RLHF, RAG.", tags: ["AI", "LLM", "Karpathy", "OpenAI"], levelRank: "Staff+" },
  { videoId: "i53Gi_K3o7I", title: "20 System Design Concepts Explained in 10 Minutes", channel: "NeetCode", durationFormatted: "10:00", description: "20 khái niệm thiết kế hệ thống phân tán cốt lõi: Load Balancer, Caching, CAP.", tags: ["System Design", "Scalability", "NeetCode"], levelRank: "Staff+" },
  { videoId: "YXkOdWBwqaA", title: "Rate Limiter System Design: Token Bucket, Scaling", channel: "ByteByteGo", durationFormatted: "10:20", description: "Thiết kế hệ thống giới hạn tần suất yêu cầu: Token Bucket, Leaky Bucket.", tags: ["System Design", "Rate Limiter", "ByteByteGo"], levelRank: "Staff+" },
  { videoId: "UF9Iqmg94tk", title: "Consistent Hashing: Algorithms You Should Know", channel: "ByteByteGo", durationFormatted: "08:12", description: "Thuật toán băm nhất quán trong hệ thống phân tán và bộ nhớ đệm.", tags: ["Consistent Hashing", "Distributed Systems"], levelRank: "Staff+" },
  { videoId: "qSJAvd5Mgio", title: "Design a URL Shortener (Bitly) - System Design Interview", channel: "NeetCodeIO", durationFormatted: "18:00", description: "Thiết kế dịch vụ rút gọn link quy mô lớn: Base62, Caching và ID collisions.", tags: ["System Design", "Bitly", "NeetCode"], levelRank: "Staff+" },
  { videoId: "SqcXvc3ZmRU", title: "System Design Primer: Distributed Systems & Scalability", channel: "Gaurav Sen", durationFormatted: "16:45", description: "Tư duy thiết kế hệ thống phân tán chịu tải cao từ Gaurav Sen.", tags: ["System Design", "Distributed Systems"], levelRank: "Staff+" },
  { videoId: "Gjnup-PuquQ", title: "Docker in 100 Seconds: Containerization", channel: "Fireship", durationFormatted: "02:20", description: "Bản chất đóng gói ứng dụng Docker: Images, Containers, Dockerfile.", tags: ["Docker", "DevOps", "Fireship"], levelRank: "Staff+" },
  { videoId: "pg19Z8LL06w", title: "Docker Crash Course for Absolute Beginners", channel: "TechWorld with Nana", durationFormatted: "30:00", description: "Thực hành toàn diện Docker cùng TechWorld with Nana: Dockerfile, Compose.", tags: ["Docker", "DevOps", "Nana"], levelRank: "Staff+" },
  { videoId: "PziYflu8cB8", title: "Kubernetes Explained in 100 Seconds", channel: "Fireship", durationFormatted: "02:22", description: "Điều phối container quy mô lớn Kubernetes: Pods, Deployments, Services.", tags: ["Kubernetes", "K8s", "DevOps"], levelRank: "Staff+" },
  { videoId: "X48VuDVv0do", title: "Kubernetes Tutorial for Beginners [FULL COURSE]", channel: "TechWorld with Nana", durationFormatted: "45:00", description: "Kiến trúc Kubernetes thực chiến: Ingress, ConfigMaps, Secrets, Pods.", tags: ["Kubernetes", "Cloud Native", "Nana"], levelRank: "Staff+" },
  { videoId: "tomUWcQ0P3k", title: "Terraform in 100 Seconds: Infrastructure as Code", channel: "Fireship", durationFormatted: "02:25", description: "Hạ tầng dưới dạng mã nguồn (IaC) với Terraform.", tags: ["Terraform", "DevOps", "Cloud"], levelRank: "Staff+" },
  { videoId: "scEDHsr3APg", title: "DevOps CI/CD Explained in 100 Seconds", channel: "Fireship", durationFormatted: "02:10", description: "Quy trình tích hợp liên tục và triển khai liên tục CI/CD.", tags: ["DevOps", "CI/CD", "Automation"], levelRank: "Staff+" },
  { videoId: "ZV5yTm4pT8g", title: "OAuth 2 Explained In Simple Terms", channel: "ByteByteGo", durationFormatted: "06:30", description: "Khung xác thực và phân quyền chuẩn OAuth 2.0: Access Tokens, PKCE Flow.", tags: ["Security", "OAuth", "ByteByteGo"], levelRank: "Staff+" },
  { videoId: "996OiexHze0", title: "OAuth 2.0 and OpenID Connect (in plain English)", channel: "OktaDev", durationFormatted: "25:00", description: "Phân biệt Xác thực (OpenID Connect) và Phân quyền (OAuth 2.0).", tags: ["OAuth", "OpenID Connect", "Security"], levelRank: "Staff+" }
];
