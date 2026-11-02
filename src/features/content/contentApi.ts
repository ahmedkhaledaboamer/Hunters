import { baseApi } from '../../shared/api/baseApi';
import type { Consultant, L, Location, Market, Milestone, Phase, Pillar, Position } from '../../entities';

export type PillarKind = 'why' | 'engagement' | 'value' | 'layers';
export type StatementKind = 'governance' | 'executive' | 'customerAi';

export const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPhases: build.query<Phase[], void>({ query: () => ({ url: '/phases' }) }),
    getPillars: build.query<Pillar[], PillarKind>({ query: (kind) => ({ url: `/pillars/${kind}` }) }),
    getStatements: build.query<L[], StatementKind>({ query: (kind) => ({ url: `/statements/${kind}` }) }),
    getMilestones: build.query<Milestone[], void>({ query: () => ({ url: '/milestones' }) }),
    getConsultants: build.query<Consultant[], void>({ query: () => ({ url: '/consultants' }) }),
    getPositions: build.query<Position[], void>({ query: () => ({ url: '/positions' }) }),
    getLocation: build.query<{office: Location;markets: Market[];}, void>({ query: () => ({ url: '/location' }) }),
    submitForm: build.mutation<{ok: boolean;}, {kind: 'contact' | 'newsletter' | 'partner-applications' | 'job-applications';body: unknown;}>({
      query: ({ kind, body }) => ({ url: `/${kind}`, method: 'POST', body })
    })
  })
});

export const {
  useGetPhasesQuery,
  useGetPillarsQuery,
  useGetStatementsQuery,
  useGetMilestonesQuery,
  useGetConsultantsQuery,
  useGetPositionsQuery,
  useGetLocationQuery,
  useSubmitFormMutation
} = contentApi;