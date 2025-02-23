import pandas as pd

# PolicyActions 数据
policy_actions = [
    {"id": 1, "action": "Increase government spending", "type": "fiscal_policy"},
    {"id": 2, "action": "Decrease taxes", "type": "fiscal_policy"},
    {"id": 3, "action": "Increase interest rates", "type": "monetary_policy"},
    {"id": 4, "action": "Decrease reserve requirement", "type": "monetary_policy"},
    {"id": 5, "action": "Open market purchase of bonds", "type": "monetary_policy"},
    {"id": 6, "action": "Increase income tax rates", "type": "fiscal_policy"},
    {"id": 7, "action": "Decrease government spending", "type": "fiscal_policy"},
    {"id": 8, "action": "Open market sale of bonds", "type": "monetary_policy"}
]

# EconomicVariables 数据
economic_variables = [
    {"id": 1, "name": "Aggregate Demand", "category": "macro_indicator"},
    {"id": 2, "name": "Real GDP", "category": "macro_indicator"},
    {"id": 3, "name": "Price Level", "category": "macro_indicator"},
    {"id": 4, "name": "Interest Rate", "category": "financial_indicator"},
    {"id": 5, "name": "Investment Spending", "category": "expenditure"},
    {"id": 6, "name": "Money Supply", "category": "monetary"},
    {"id": 7, "name": "Unemployment Rate", "category": "labor_market"},
    {"id": 8, "name": "Exchange Rate", "category": "international"}
]

# PolicyEffects 数据
policy_effects = [
    {"policyId": 1, "variableId": 1, "effect": "increase", "explanation": "增加政府支出直接增加总需求"},
    {"policyId": 1, "variableId": 2, "effect": "increase", "explanation": "增加政府支出促进经济增长"},
    {"policyId": 3, "variableId": 5, "effect": "decrease", "explanation": "提高利率降低投资支出"},
    {"policyId": 4, "variableId": 6, "effect": "increase", "explanation": "降低准备金率增加货币供给"},
    {"policyId": 5, "variableId": 4, "effect": "decrease", "explanation": "公开市场购买债券降低利率"},
    {"policyId": 6, "variableId": 1, "effect": "decrease", "explanation": "提高所得税率降低可支配收入，减少总需求"},
    {"policyId": 8, "variableId": 6, "effect": "decrease", "explanation": "公开市场卖出债券减少货币供给"}
]

# DiagramData 数据
diagram_data = [
    {"id": 1, "name": "AD-AS Diagram", "curves": "Aggregate Demand,Short-run Aggregate Supply,Long-run Aggregate Supply"},
    {"id": 2, "name": "Money Market Diagram", "curves": "Money Supply,Money Demand"},
    {"id": 3, "name": "Loanable Funds Market", "curves": "Supply of Loanable Funds,Demand for Loanable Funds"},
    {"id": 4, "name": "Foreign Exchange Market", "curves": "Supply of Dollars,Demand for Dollars"},
    {"id": 5, "name": "Phillips Curve", "curves": "Short-run Phillips Curve,Long-run Phillips Curve"}
]

# EconomicEvents 数据
economic_events = [
    {"id": 1, "event": "Household savings increase", "affectedDiagram": "Loanable Funds Market", 
     "affectedCurve": "Supply of Loanable Funds", "effect": "increase", "explanation": "储蓄增加导致可贷资金供给增加"},
    {"id": 2, "event": "Technology improvement", "affectedDiagram": "AD-AS Diagram", 
     "affectedCurve": "Long-run Aggregate Supply", "effect": "increase", "explanation": "技术进步提高长期总供给"},
    {"id": 3, "event": "Consumer confidence decreases", "affectedDiagram": "AD-AS Diagram", 
     "affectedCurve": "Aggregate Demand", "effect": "decrease", "explanation": "消费者信心下降导致总需求减少"}
]

# 创建 Excel 文件
with pd.ExcelWriter('data.xlsx') as writer:
    pd.DataFrame(policy_actions).to_excel(writer, sheet_name='PolicyActions', index=False)
    pd.DataFrame(economic_variables).to_excel(writer, sheet_name='EconomicVariables', index=False)
    pd.DataFrame(policy_effects).to_excel(writer, sheet_name='PolicyEffects', index=False)
    pd.DataFrame(diagram_data).to_excel(writer, sheet_name='DiagramData', index=False)
    pd.DataFrame(economic_events).to_excel(writer, sheet_name='EconomicEvents', index=False)