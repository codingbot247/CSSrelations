import React, { useState } from 'react';

const CSSProperty = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => (
  <div className="flex items-center mb-4">
    <label className="w-40 text-indigo-700 font-semibold">{label}:</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      step={step}
      className="mr-2 w-48"
    />
    <span className="bg-indigo-100 px-2 py-1 rounded-md text-indigo-700">{value}px</span>
  </div>
);

const ColorPicker = ({ label, value, onChange }) => (
  <div className="flex items-center mb-4">
    <label className="w-40 text-indigo-700 font-semibold">{label}:</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mr-2 w-10 h-10 rounded-full"
    />
    <span className="bg-indigo-100 px-2 py-1 rounded-md text-indigo-700">{value}</span>
  </div>
);

const Dropdown = ({ label, value, onChange, options }) => (
  <div className="flex items-center mb-4">
    <label className="w-40 text-indigo-700 font-semibold">{label}:</label>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="p-2 bg-indigo-100 rounded-md text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const Element = ({ style, children, depth = 0 }) => (
  <div style={{
    ...style,
    border: '2px solid rgba(79, 70, 229, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  }}
  className="hover:shadow-lg"
  >
    {children}
  </div>
);

const InteractiveCSSApp = () => {
  const [parentStyle, setParentStyle] = useState({
    padding: 20,
    margin: 10,
    width: 300,
    height: 300,
    position: 'static',
    display: 'block',
    backgroundColor: '#E0FFFF',
  });

  const [childStyle, setChildStyle] = useState({
    padding: 10,
    margin: 5,
    width: 100,
    height: 100,
    position: 'static',
    display: 'block',
    backgroundColor: '#98FB98',
  });

  const [grandchildStyle, setGrandchildStyle] = useState({
    padding: 5,
    margin: 2,
    width: 50,
    height: 50,
    position: 'static',
    display: 'block',
    backgroundColor: '#FFB6C1',
  });

  const updateStyle = (setter) => (key, value) => {
    setter(prev => ({ ...prev, [key]: value }));
  };

  const positionOptions = ['static', 'relative', 'absolute', 'fixed'];
  const displayOptions = ['block', 'inline', 'inline-block', 'flex', 'grid'];

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Interactive CSS Learning App</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">CSS Controls</h2>
          <div className="mb-8 p-4 bg-indigo-50 rounded-md">
            <h3 className="font-bold text-lg mb-4 text-indigo-800">Parent Element</h3>
            <CSSProperty label="Padding" value={parentStyle.padding} onChange={(v) => updateStyle(setParentStyle)('padding', v)} />
            <CSSProperty label="Margin" value={parentStyle.margin} onChange={(v) => updateStyle(setParentStyle)('margin', v)} />
            <CSSProperty label="Width" value={parentStyle.width} onChange={(v) => updateStyle(setParentStyle)('width', v)} max={500} />
            <CSSProperty label="Height" value={parentStyle.height} onChange={(v) => updateStyle(setParentStyle)('height', v)} max={500} />
            <Dropdown label="Position" value={parentStyle.position} onChange={(v) => updateStyle(setParentStyle)('position', v)} options={positionOptions} />
            <Dropdown label="Display" value={parentStyle.display} onChange={(v) => updateStyle(setParentStyle)('display', v)} options={displayOptions} />
            <ColorPicker label="Background" value={parentStyle.backgroundColor} onChange={(v) => updateStyle(setParentStyle)('backgroundColor', v)} />
          </div>
          <div className="mb-8 p-4 bg-green-50 rounded-md">
            <h3 className="font-bold text-lg mb-4 text-green-800">Child Element</h3>
            <CSSProperty label="Padding" value={childStyle.padding} onChange={(v) => updateStyle(setChildStyle)('padding', v)} />
            <CSSProperty label="Margin" value={childStyle.margin} onChange={(v) => updateStyle(setChildStyle)('margin', v)} />
            <CSSProperty label="Width" value={childStyle.width} onChange={(v) => updateStyle(setChildStyle)('width', v)} max={300} />
            <CSSProperty label="Height" value={childStyle.height} onChange={(v) => updateStyle(setChildStyle)('height', v)} max={300} />
            <Dropdown label="Position" value={childStyle.position} onChange={(v) => updateStyle(setChildStyle)('position', v)} options={positionOptions} />
            <Dropdown label="Display" value={childStyle.display} onChange={(v) => updateStyle(setChildStyle)('display', v)} options={displayOptions} />
            <ColorPicker label="Background" value={childStyle.backgroundColor} onChange={(v) => updateStyle(setChildStyle)('backgroundColor', v)} />
          </div>
          <div className="p-4 bg-pink-50 rounded-md">
            <h3 className="font-bold text-lg mb-4 text-pink-800">Grandchild Element</h3>
            <CSSProperty label="Padding" value={grandchildStyle.padding} onChange={(v) => updateStyle(setGrandchildStyle)('padding', v)} />
            <CSSProperty label="Margin" value={grandchildStyle.margin} onChange={(v) => updateStyle(setGrandchildStyle)('margin', v)} />
            <CSSProperty label="Width" value={grandchildStyle.width} onChange={(v) => updateStyle(setGrandchildStyle)('width', v)} max={200} />
            <CSSProperty label="Height" value={grandchildStyle.height} onChange={(v) => updateStyle(setGrandchildStyle)('height', v)} max={200} />
            <Dropdown label="Position" value={grandchildStyle.position} onChange={(v) => updateStyle(setGrandchildStyle)('position', v)} options={positionOptions} />
            <Dropdown label="Display" value={grandchildStyle.display} onChange={(v) => updateStyle(setGrandchildStyle)('display', v)} options={displayOptions} />
            <ColorPicker label="Background" value={grandchildStyle.backgroundColor} onChange={(v) => updateStyle(setGrandchildStyle)('backgroundColor', v)} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">Preview</h2>
          <div className="border-4 border-dashed border-indigo-200 p-4 rounded-lg">
            <Element style={parentStyle} depth={0}>
              Parent
              <Element style={childStyle} depth={1}>
                Child
                <Element style={grandchildStyle} depth={2}>
                  Grandchild
                </Element>
              </Element>
            </Element>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCSSApp;
