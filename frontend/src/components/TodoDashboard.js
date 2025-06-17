import React, { useState } from 'react';

const yearList = [2025, 2024, 2023, 2022];
const tabList = [
  '전체', '전자서명', '안전점검', '안전조치', '위원회 업무', '반기점검',
  '위험성평가', '신고/제안', '보호구지급', '업체 평가', 'TBM', '건강진단',
  '직무스트레스', '도급 안전점검', '근골격계 조사'
];

function TodoDashboard() {
  const [year, setYear] = useState(yearList[0]);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [excludeDone, setExcludeDone] = useState(true);

  return (
    <div className="space-y-6">
      {/* 상단 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">할 일</h2>
        <div>
          <button className="border rounded px-3 py-1 text-gray-700 flex items-center">
            {year} <span className="ml-1">▼</span>
          </button>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <span className="text-3xl mr-4">👜</span>
          <div>
            <div className="font-semibold">해야할 일</div>
            <div className="text-orange-400 font-bold">0건</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <span className="text-3xl mr-4">⏰</span>
          <div>
            <div className="font-semibold">기한초과</div>
            <div className="text-red-400 font-bold">0건</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <span className="text-3xl mr-4">✔️</span>
          <div>
            <div className="font-semibold">완료</div>
            <div className="text-blue-400 font-bold">0건</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <span className="text-3xl mr-4">🔄</span>
          <div>
            <div className="font-semibold">업무진행률</div>
            <div className="text-green-500 font-bold">0%</div>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center mb-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={excludeDone}
            onChange={() => setExcludeDone(!excludeDone)}
            className="form-checkbox text-blue-600 mr-2"
          />
          완료/취소 제외
        </label>
      </div>

      {/* 탭 */}
      <div className="flex space-x-4 overflow-x-auto border-b mb-6">
        {tabList.map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`py-2 px-2 whitespace-nowrap border-b-2 ${selectedTab === tab ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 할 일 없음 안내 */}
      <div className="flex flex-col items-center justify-center py-16">
        <span className="text-7xl mb-4">🔍</span>
        <div className="text-lg font-semibold text-gray-700 mb-1">할 일이 없습니다.</div>
        <div className="text-gray-500 text-sm">새로운 할 일이 생기면 여기에서 보여요.</div>
      </div>
    </div>
  );
}

export default TodoDashboard; 