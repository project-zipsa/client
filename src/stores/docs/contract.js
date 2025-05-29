import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useContractStore = defineStore('contractStore', {
  state: () => ({
    contents: null,
  }),
  actions: {
    async uploadContract(payload) {
      try {
        const { data } = await axios.post(`${baseURL}zipsa/clova/lease-contracts`, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        this.contents = data
        console.log('Data uploaded successfully:', data)
      } catch (err) {
        console.log(err)
      }
    },
    async uploadContractTest() {
      try {
        const result = await new Promise((resolve) => {
          setTimeout(() => {
            this.contents = {
              message: '전세계약서 추출 및 저장 성공',
              data: {
                '계약 기본 정보 추출': {
                  '부동산 주소': {
                    전체: '서울특별시 성북구 길음동 1192 비전타운 제2층 201호',
                    시: '서울특별시',
                    구: '성북구',
                    동: '길음동',
                    '건물명/상세': '비전타운 제2층 201호',
                  },
                  '임대차 기간': {
                    시작일: '2024년04월01일',
                    종료일: '2026년03월31일',
                  },
                  '비용 정보': {
                    '총 보증금': '일억사천만원정 (₩140,000,000)',
                    계약금: '칠백만원정',
                    중도금: '없음',
                    잔금: '일억삼천삼백만원정',
                  },
                },
                '계약 위험 분석 결과': {
                  '보증금 반환 조건 명시 여부': {
                    답변: '예',
                    경고: '',
                    '근거 조항': '제5조',
                  },
                  '과도한 위약금 조항 존재 여부': {
                    답변: '아니오',
                    경고: '',
                    '근거 조항': '',
                  },
                  '일방적인 계약 해지 조건 존재 여부': {
                    답변: '예',
                    경고: '임대인이 임차인의 위반 행위에 대해 즉시 계약을 해지할 수 있는 권한을 가지고 있어요.',
                    '근거 조항': '제4조',
                  },
                  '원상복구 범위 불명확 조건 존재 여부': {
                    답변: '아니오',
                    경고: '',
                    '근거 조항': '',
                  },
                  '임대인 정보 불일치 여부': {
                    답변: '아니오',
                    경고: '',
                    '근거 조항': '',
                  },
                  '계약 만료일 미기재 또는 불명확 여부': {
                    답변: '예',
                    경고: '계약 만료일이 명확하게 기재되어 있지 않아요.',
                    '근거 조항': '제2조',
                  },
                  '특약 조항의 모호성 또는 불리한 해석 가능성 여부': {
                    답변: '아니오',
                    경고: '',
                    '근거 조항': '',
                  },
                  '기타 불리한 조항 존재 여부 (GPT 탐지)': {
                    답변: '아니오',
                    경고: '',
                    '근거 조항': '',
                  },
                },
                '위험 요소별 점수': {
                  '보증금 반환 조건': '0',
                  '과도한 위약금 조항': '0',
                  '일방적인 계약 해지 조건': '2',
                  '원상복구 범위 불명확 조항': '0',
                  '임대인 정보 불일치': '0',
                  '계약 만료일 미기재 또는 불명확 조항': '1',
                  '특약 조항의 모호성': '0',
                  '기타 불리한 조항': '0',
                },
                '전체 위험 요소 수': '2',
                '최고 위험 점수': '2',
                '전체 위험도 점수': '3',
                '사기 유형 및 대처 방안': {
                  '일방적인 계약 해지 조건': {
                    '사기 유형': '임대인이 일방적으로 계약을 해지할 수 있어요.',
                    '대처 방안':
                      '임차인의 권리를 보호하는 조항을 추가하거나, 임대인의 일방적인 계약 해지를 제한하는 조항을 추가해요.',
                  },
                  '계약 만료일 미기재 또는 불명확': {
                    '사기 유형':
                      '계약 만료일이 불명확하면 계약 종료 시점에 대한 분쟁이 발생할 수 있어요.',
                    '대처 방안': '계약 만료일을 명확하게 기재하고, 확정일자를 받아요.',
                  },
                },
                '조항별 요약 및 설명': {
                  '일방적인 계약 해지 조건':
                    '임대인이 임차인의 위반 행위에 대해 즉시 계약을 해지할 수 있는 권한을 가지고 있어요.',
                  '계약 만료일 미기재 또는 불명확':
                    '계약 만료일이 명확하게 기재되어 있지 않아요. 이로 인해 계약 종료 시점에 대한 분쟁이 발생할 수 있어요.',
                },
              },
            }
            resolve(this.contents)
          }, 3000)
        })

        return result
      } catch (err) {
        console.log(err)
      }
    },
  },
})
