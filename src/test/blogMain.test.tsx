import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Home from '@/app/page';
import { mockServer } from './mockServer';
import { rest } from 'msw';

async function resolvedComponent(Component, props) {
  const ComponentRsolved = await Component(props);
  return () => ComponentRsolved;
}

describe('blogMain', () => {
  it('should get list of blogPosts', async () => {
    mockServer.use(rest.get('/api/post', (req, res, ctx) => {}));

    const MainPage = await resolvedComponent(Home, { searchParams: null });
    render(<MainPage />);
  });
});
