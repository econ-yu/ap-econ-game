import pandas as pd
import numpy as np
import os

def excel_to_js(excel_file, output_file):
    # 读取各个工作表
    policy_actions = pd.read_excel(excel_file, sheet_name='PolicyActions')
    economic_variables = pd.read_excel(excel_file, sheet_name='EconomicVariables')
    policy_effects = pd.read_excel(excel_file, sheet_name='PolicyEffects')
    diagram_data = pd.read_excel(excel_file, sheet_name='DiagramData')
    economic_events = pd.read_excel(excel_file, sheet_name='EconomicEvents')

    # 处理空值，将 NaN 转换为 null
    policy_actions = policy_actions.replace({np.nan: 'null'})
    economic_variables = economic_variables.replace({np.nan: 'null'})
    policy_effects = policy_effects.replace({np.nan: 'null'})
    diagram_data = diagram_data.replace({np.nan: 'null'})
    economic_events = economic_events.replace({np.nan: 'null'})

    # 生成 JS 代码
    js_content = """// 政策行为数据
export const policyActions = {policy_actions};

// 经济变量
export const economicVariables = {economic_variables};

// 政策影响关系
export const policyEffects = {policy_effects};

// 图表相关数据
export const diagramData = {diagram_data};

// 事件数据
export const economicEvents = {economic_events};
"""

    # 转换数据为 JS 格式
    js_content = js_content.format(
        policy_actions=policy_actions.to_dict('records'),
        economic_variables=economic_variables.to_dict('records'),
        policy_effects=policy_effects.to_dict('records'),
        diagram_data=diagram_data.to_dict('records'),
        economic_events=economic_events.to_dict('records')
    )

    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # 写入文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    excel_file = os.path.join(current_dir, 'data.xlsx')
    output_file = os.path.join(current_dir, '..', 'src', 'data', 'economicData.js')
    
    excel_to_js(excel_file, output_file)