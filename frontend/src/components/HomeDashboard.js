import React from 'react';
import Card from './Card';
import { HiOutlineClipboardList, HiOutlineSpeakerphone } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function HomeDashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* 상단: 경영방침, 안전보건목표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="text-lg font-bold mb-2">경영방침</div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate('/policy')}>확인하기</button>
            </div>
            <div className="flex justify-end mt-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">👨‍💼</div>
            </div>
          </div>
        </Card>
        <div></div>
        <Card>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="text-lg font-bold mb-2">안전보건 목표</div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate('/policy')}>확인하기</button>
            </div>
            <div className="flex justify-end mt-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">📈</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 중단: 할 일, 결재함 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="min-h-[220px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">할 일</span>
            <a href="#" className="text-sm text-blue-700 font-medium">바로가기 &gt;</a>
          </div>
          <div className="flex flex-col items-center justify-center h-40">
            <HiOutlineClipboardList className="text-5xl text-gray-300 mb-2" />
            <div className="text-gray-700 font-semibold mb-1">할 일이 없습니다.</div>
            <div className="text-gray-500 text-sm">새로운 할 일이 생기면 여기에서 보여요.</div>
          </div>
        </Card>
        <Card className="min-h-[220px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">결재함</span>
            <a href="#" className="text-sm text-blue-700 font-medium">바로가기 &gt;</a>
          </div>
          <div className="flex border-b text-sm">
            <div className="flex-1 py-2 text-center font-semibold bg-gray-100">받은 문서함</div>
            <div className="flex-1 py-2 text-center text-gray-400">보낸 문서함</div>
          </div>
          <div className="flex flex-col items-center justify-center h-32">
            <HiOutlineClipboardList className="text-5xl text-gray-300 mb-2" />
            <div className="text-gray-700 font-semibold mb-1">받은 문서가 없습니다.</div>
            <div className="text-gray-500 text-sm">결재 문서가 생기면 여기에서 보여요.</div>
          </div>
        </Card>
      </div>

      {/* 하단: 공지사항 */}
      <Card className="min-h-[220px]">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">공지사항</span>
          <a href="#" className="text-sm text-blue-700 font-medium">바로가기 &gt;</a>
        </div>
        <div className="flex flex-col items-center justify-center h-32">
          <HiOutlineSpeakerphone className="text-5xl text-gray-300 mb-2" />
          <div className="text-gray-700 font-semibold mb-1">공지사항이 없습니다.</div>
          <div className="text-gray-500 text-sm mb-2">구성원들에게 알려주고 싶은 내용은 공지사항으로 작성해보세요.</div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">작성하기</button>
        </div>
      </Card>
    </div>
  );
}

export default HomeDashboard; 