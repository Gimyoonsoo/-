import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PolicyDashboard({
  onOpenRegister,
  onOpenDirect,
  onOpenSeal,
  policies = [],
  onEdit,
  onDelete,
  selectedId,
  setSelectedId,
  showDeleteConfirm,
  onDeleteConfirm,
  onDeleteCancel
}) {
  const selectedPolicy = policies.find(p => p.id === selectedId);

  // PDF 다운로드 함수
  const handleDownload = (policy) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('안전보건경영방침', 14, 18);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`제/개정일: ${policy.date || ''}`, 14, 28);
    doc.text(`사업장명: ${policy.company || ''}`, 14, 36);
    doc.text(`경영책임자: ${policy.manager || ''}`, 14, 44);
    doc.autoTable({
      startY: 52,
      head: [['No.', '내용']],
      body: [
        ['머리말', policy.head],
        ...policy.bodies.map((b, i) => [String(i + 1).padStart(2, '0'), b])
      ],
      styles: { font: 'helvetica', fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 14, right: 14 }
    });
    doc.save(`안전보건경영방침_${policy.date || ''}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">안전보건경영방침</h2>
        <div className="relative">
          <button onClick={onOpenRegister} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            + 경영방침 등록
          </button>
        </div>
      </div>

      {/* 경영방침이 없을 때 */}
      {policies.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded">
          <div className="text-6xl mb-4 text-gray-300">🛡️</div>
          <div className="text-lg font-bold mb-2">경영방침이 없습니다.</div>
          <div className="text-gray-500 mb-4">경영방침을 등록하여 지켜야 할 행동의 기본사항을 안내해 주세요.</div>
          <button onClick={onOpenRegister} className="bg-blue-500 text-white px-4 py-2 rounded">경영방침 등록하기</button>
        </div>
      )}

      {/* 경영방침이 있을 때 */}
      {policies.length > 0 && selectedPolicy && (
        <>
          {/* 상단 테이블 */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-2 w-16">No.</th>
                <th className="py-2 px-2">안전보건경영방침</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-2 font-bold text-center">머리말</td>
                <td className="py-2 px-2">{selectedPolicy.head}</td>
              </tr>
              {selectedPolicy.bodies.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-2 text-center">{`0${idx + 1}`}</td>
                  <td className="py-2 px-2">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 하단 정보 및 버튼 */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-500">{selectedPolicy.date}</div>
            <div className="flex items-center space-x-2">
              <span>{selectedPolicy.company} {selectedPolicy.manager}</span>
              <button onClick={onOpenSeal} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                <span className="mr-1">⬇</span> 직인등록
              </button>
            </div>
          </div>
        </>
      )}

      {/* 하단 목록 테이블 */}
      {policies.length > 0 && (
        <div>
          <div className="font-semibold mb-2">안전보건경영방침 목록</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-2 w-8"><input type="checkbox" disabled /></th>
                <th className="py-2 px-2 w-16">No.</th>
                <th className="py-2 px-2">제/개정일</th>
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy, idx) => (
                <tr key={policy.id} className={`border-b ${selectedId === policy.id ? 'bg-blue-50' : ''}`}>
                  <td className="py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedId === policy.id}
                      onChange={() => setSelectedId(policy.id)}
                    />
                  </td>
                  <td className="py-2 px-2 text-center">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="py-2 px-2 text-center">{policy.date}</td>
                  <td className="py-2 px-2 text-right">
                    <button onClick={() => onEdit(policy)} className="bg-orange-200 text-orange-700 px-3 py-1 rounded mr-2">수정</button>
                    <button onClick={() => onDelete(policy.id)} className="bg-red-200 text-red-700 px-3 py-1 rounded mr-2">삭제</button>
                    <button className="bg-blue-200 text-blue-700 px-3 py-1 rounded" onClick={() => handleDownload(policy)}>다운로드</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 min-w-[320px]">
            <div className="text-lg font-bold mb-4">정말 삭제하시겠습니까?</div>
            <div className="flex justify-end space-x-4">
              <button onClick={onDeleteCancel} className="px-4 py-2 rounded bg-gray-200">취소</button>
              <button onClick={onDeleteConfirm} className="px-4 py-2 rounded bg-red-500 text-white">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PolicyDashboard; 