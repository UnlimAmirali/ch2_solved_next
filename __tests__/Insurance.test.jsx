import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InsuranceInfo from '../pages/Insurance';
import axios from 'axios';

// Mock کردن axios
jest.mock('axios');

describe('InsuranceInfo Component', () => {
  const mockData = {
    data: {
      insuranceInfo: [
        { userId: 1, car: 'Car A', policyNumber: '123', insuranceValue: 5000 },
        { userId: 2, car: 'Car B', policyNumber: '456', insuranceValue: 10000 },
        { userId: 3, car: 'Car C', policyNumber: '789', insuranceValue: 2000 },
      ]
    }
  };

  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);  // Mock کردن داده‌ها
  });

  it('should render insurance data correctly', async () => {
    render(<InsuranceInfo />);
    
    // منتظر می‌مانیم تا داده‌ها بارگذاری شوند
    await waitFor(() => screen.getByText('Car A'));
    
    // بررسی می‌کنیم که آیا داده‌ها در جدول نمایش داده می‌شوند
    expect(screen.getByText('Car A')).toBeInTheDocument();
    expect(screen.getByText('Car B')).toBeInTheDocument();
    expect(screen.getByText('Car C')).toBeInTheDocument();
  });

  it('should sort data in ascending and descending order correctly', async () => {
    render(<InsuranceInfo />);
  
    // صبر می‌کنیم تا داده‌ها بارگذاری شوند
    await waitFor(() => screen.getByText('Car A'));
  
    const rows = () => screen.getAllByRole('row').slice(1); // گرفتن تمام ردیف‌ها (غیر از header)
    const sortButton = screen.getByRole('button', { name: /sort by value/i });
  
    // بررسی ترتیب اولیه
    let rowValues = rows().map((row) => row.cells[3].textContent); // ستون مقدار بیمه
    expect(rowValues).toEqual(['5000', '10000', '2000']); // ترتیب اولیه
  
    // کلیک اول: مرتب‌سازی صعودی
    fireEvent.click(sortButton);
  
    rowValues = rows().map((row) => row.cells[3].textContent);
    expect(rowValues).toEqual(['2000', '5000', '10000']); // بررسی ترتیب صعودی
  
    // کلیک دوم: مرتب‌سازی نزولی
    fireEvent.click(sortButton);
  
    rowValues = rows().map((row) => row.cells[3].textContent);
    expect(rowValues).toEqual(['10000', '5000', '2000']); // بررسی ترتیب نزولی
  });
  

//   it('should sort data in descending and ascending order correctly', async () => {
//     render(<InsuranceInfo />);
  
//     // صبر می‌کنیم تا داده‌ها بارگذاری شوند
//     await waitFor(() => screen.getByText('Car A'));
  
//     const rows = () => screen.getAllByRole('row').slice(1); // گرفتن تمام ردیف‌ها (غیر از header)
//     const sortButton = screen.getByRole('button', { name: /sort by value/i });
  
//     // ترتیب اولیه
//     let rowValues = rows().map((row) => row.cells[3].textContent); // ستون مقدار بیمه
//     expect(rowValues).toEqual(['5000', '10000', '2000']); // ترتیب اولیه
  
//     // کلیک اول: مرتب‌سازی نزولی
//     fireEvent.click(sortButton);
  
//     rowValues = rows().map((row) => row.cells[3].textContent);
//     expect(rowValues).toEqual(['10000', '5000', '2000']); // بررسی ترتیب نزولی
  
//     // کلیک دوم: مرتب‌سازی صعودی
//     fireEvent.click(sortButton);
  
//     rowValues = rows().map((row) => row.cells[3].textContent);
//     expect(rowValues).toEqual(['2000', '5000', '10000']); // بررسی ترتیب صعودی
//   });
})  