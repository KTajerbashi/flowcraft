"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'FlowCraft backend is running',
    });
});
app.listen(PORT, () => {
    console.log('=================================');
    console.log(' FlowCraft Backend');
    console.log('=================================');
    console.log(` Server running on port ${PORT}`);
    console.log(` http://localhost:${PORT}`);
    console.log('=================================');
});
