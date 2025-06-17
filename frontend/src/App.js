import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeDashboard from './components/HomeDashboard';
import TodoDashboard from './components/TodoDashboard';
import PolicyDashboard from './components/PolicyDashboard';

// 모달 컴포넌트는 일단 빈 컴포넌트로 생성해둡니다.
function RegisterDropdown({ onDirect, onImage, onClose, anchorRef }) {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border" style={{minWidth: '120px'}}>
      <button onClick={onDirect} className="block w-full text-left px-4 py-2 hover:bg-gray-100">직접 등록</button>
      <button onClick={onImage} className="block w-full text-left px-4 py-2 hover:bg-gray-100">이미지 등록</button>
    </div>
  );
}

function PolicyRegisterModal({ onClose, onSave, initial }) {
  const [date, setDate] = useState(initial?.date || '');
  const [head, setHead] = useState(initial?.head || '');
  const [bodies, setBodies] = useState(initial?.bodies || ['']);
  const [company, setCompany] = useState(initial?.company || '');
  const [manager, setManager] = useState(initial?.manager || '');

  const handleBodyChange = (idx, value) => {
    setBodies(bodies.map((b, i) => (i === idx ? value : b)));
  };
  const addBody = () => setBodies([...bodies, '']);
  const removeBody = (idx) => setBodies(bodies.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, head, bodies, company, manager });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600">×</button>
        <h2 className="text-2xl font-bold text-center mb-6">경영방침 등록</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold">제/개정일*</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">머리말*</label>
            <input className="w-full border rounded px-3 py-2" value={head} onChange={e => setHead(e.target.value)} placeholder="머리말을 입력하세요." />
          </div>
          {bodies.map((body, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input className="w-full border rounded px-3 py-2" value={body} onChange={e => handleBodyChange(idx, e.target.value)} placeholder={`본문${idx+1}*`} />
              {bodies.length > 1 && (
                <button type="button" onClick={() => removeBody(idx)} className="text-red-500 text-xl">🗑️</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addBody} className="bg-blue-100 text-blue-700 px-4 py-2 rounded">본문 추가</button>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">사업장명</label>
              <input className="w-full border rounded px-3 py-2" value={company} onChange={e => setCompany(e.target.value)} placeholder="사업장명" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">경영책임자</label>
              <input className="w-full border rounded px-3 py-2" value={manager} onChange={e => setManager(e.target.value)} placeholder="경영책임자" />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"><span className="mr-1">💾</span> 저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PolicyImageRegisterModal({ onClose, onSave }) {
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [allSites, setAllSites] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-8 max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600">×</button>
        <h2 className="text-2xl font-bold text-center mb-6">경영방침 등록</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <label className="block mb-1 font-semibold">제,개정일*</label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={allSites} onChange={e => setAllSites(e.target.checked)} />
              <span className="text-sm">모든 사업장에 추가</span>
              <span className="text-gray-400 ml-1" title="모든 사업장에 적용됩니다.">ⓘ</span>
            </label>
          </div>
          <input type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e => setDate(e.target.value)} />
          <div>
            <label className="block mb-1 font-semibold">경영방침 이미지</label>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => fileInputRef.current.click()}>
              ⬆ 경영방침 이미지
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            {image && <div className="mt-2 text-sm text-gray-700">선택된 파일: {image.name}</div>}
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"><span className="mr-1">💾</span> 저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SealModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    regnum: '',
    address: '',
    addressDetail: '',
    type: '사업장',
    job: '',
    worker: '',
    manager: '',
    phone: '',
    email: '',
    file1: null,
    file2: null
  });
  const file1Ref = useRef();
  const file2Ref = useRef();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600">×</button>
        <h2 className="text-2xl font-bold text-center mb-6">사업장</h2>
        <form className="space-y-8">
          <div>
            <div className="font-semibold mb-2">사업장 정보</div>
            <div className="flex items-center space-x-6 mb-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" checked={form.type === '사업장'} onChange={() => setForm(f => ({ ...f, type: '사업장' }))} className="accent-orange-400" />
                <span className="text-orange-500 font-semibold">사업장</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" checked={form.type === '건설현장'} onChange={() => setForm(f => ({ ...f, type: '건설현장' }))} className="accent-orange-400" />
                <span>건설현장</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">사업장명 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="사업장명을 입력해주세요." />
              </div>
              <div>
                <label className="block text-sm mb-1">사업자등록번호 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.regnum} onChange={e => setForm(f => ({ ...f, regnum: e.target.value }))} placeholder="사업자등록번호를 입력해주세요." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">주소 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="주소를 입력해주세요." />
                <input className="w-full border rounded px-3 py-2 mt-2" value={form.addressDetail} onChange={e => setForm(f => ({ ...f, addressDetail: e.target.value }))} placeholder="상세주소를 입력해주세요." />
              </div>
              <div>
                <label className="block text-sm mb-1">상시근로자 수 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.worker} onChange={e => setForm(f => ({ ...f, worker: e.target.value }))} placeholder="상시근로자 수를 입력해주세요." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">업종 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.job} onChange={e => setForm(f => ({ ...f, job: e.target.value }))} placeholder="업종을 선택해주세요." />
              </div>
              <div className="flex items-end space-x-2">
                <button type="button" className="bg-blue-100 text-blue-700 px-4 py-2 rounded flex items-center" onClick={() => file1Ref.current.click()}><span className="mr-1">⬆</span> 사업자등록증</button>
                <input type="file" ref={file1Ref} className="hidden" onChange={e => setForm(f => ({ ...f, file1: e.target.files[0] }))} />
                <button type="button" className="bg-blue-100 text-blue-700 px-4 py-2 rounded flex items-center" onClick={() => file2Ref.current.click()}><span className="mr-1">⬆</span> 직인</button>
                <input type="file" ref={file2Ref} className="hidden" onChange={e => setForm(f => ({ ...f, file2: e.target.files[0] }))} />
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">담당자 정보</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">성명 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.manager} onChange={e => setForm(f => ({ ...f, manager: e.target.value }))} placeholder="성명을 입력해주세요." />
              </div>
              <div>
                <label className="block text-sm mb-1">직책</label>
                <input className="w-full border rounded px-3 py-2" placeholder="직책을 입력해주세요." />
              </div>
              <div>
                <label className="block text-sm mb-1">전화번호 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="전화번호를 입력해주세요." />
              </div>
              <div>
                <label className="block text-sm mb-1">이메일 *</label>
                <input className="w-full border rounded px-3 py-2" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="이메일을 입력해주세요." />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"><span className="mr-1">💾</span> 저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [policies, setPolicies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPolicyRegister, setShowPolicyRegister] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);
  const [showPolicyImageRegister, setShowPolicyImageRegister] = useState(false);
  const [showSeal, setShowSeal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dropdownRef = useRef();

  // 드롭다운 외부 클릭 시 닫기
  React.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  // 정책 등록/수정
  const handleSavePolicy = (data) => {
    if (editPolicy) {
      setPolicies(policies.map(p => p.id === editPolicy.id ? { ...editPolicy, ...data } : p));
      setEditPolicy(null);
    } else {
      const newId = Date.now();
      setPolicies([...policies, { ...data, id: newId }]);
      setSelectedId(newId);
    }
  };

  // 정책 삭제
  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };
  const handleDeleteConfirm = () => {
    setPolicies(policies.filter(p => p.id !== selectedId));
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };
  const handleDeleteCancel = () => setShowDeleteConfirm(false);

  // 정책 수정
  const handleEdit = (policy) => {
    setEditPolicy(policy);
    setShowPolicyRegister(true);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home/todo" element={<TodoDashboard />} />
          <Route path="/policy" element={
            <div className="relative">
              <PolicyDashboard
                onOpenRegister={() => setShowDropdown(v => !v)}
                onOpenSeal={() => setShowSeal(true)}
                policies={policies}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                showDeleteConfirm={showDeleteConfirm}
                onDeleteConfirm={handleDeleteConfirm}
                onDeleteCancel={handleDeleteCancel}
              />
              {/* 드롭다운 */}
              {showDropdown && (
                <div ref={dropdownRef} className="absolute top-16 right-0 z-50">
                  <RegisterDropdown
                    onDirect={() => { setShowDropdown(false); setShowPolicyRegister(true); setEditPolicy(null); }}
                    onImage={() => { setShowDropdown(false); setShowPolicyImageRegister(true); }}
                    onClose={() => setShowDropdown(false)}
                  />
                </div>
              )}
              {/* 직접 등록/수정 모달 */}
              {showPolicyRegister && <PolicyRegisterModal onClose={() => { setShowPolicyRegister(false); setEditPolicy(null); }} onSave={handleSavePolicy} initial={editPolicy} />}
              {/* 이미지 등록 모달 */}
              {showPolicyImageRegister && <PolicyImageRegisterModal onClose={() => setShowPolicyImageRegister(false)} onSave={handleSavePolicy} />}
              {/* 직인등록 모달 */}
              {showSeal && <SealModal onClose={() => setShowSeal(false)} />}
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 