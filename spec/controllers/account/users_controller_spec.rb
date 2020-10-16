require 'rails_helper'

RSpec.describe Account::UsersController, type: :controller do
  let!(:user) { create(:user) }
  let!(:valid_params) { attributes_for :user }
  let!(:invalid_params) { { first_name: ' ', last_name: ' ' } }

  before { sign_in user }

  describe 'GET#show' do
    before do
      get :show, params: { id: user.id }
    end

    it 'returns success and assigns user' do
      expect(response).to have_http_status(:success)
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'GET#edit' do
    before do
      get :edit, params: { id: user.id }
    end

    it 'returns http success and assign user' do
      expect(response).to have_http_status(:success)
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'PUT#update' do
    context 'with valid params' do
      before do
        put :update, params: { id: user.id,
                               user: valid_params.merge!(first_name: 'Example',
                                                         last_name: 'Test',
                                                         email: 'example@email.com') }
      end

      it 'assigns the user' do
        expect(assigns(:user)).to eq(user)
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(account_user_path(user))
      end

      it 'updates user attributes' do
        user.reload
        expect(user.first_name).to eq(valid_params[:first_name])
        expect(user.last_name).to eq(valid_params[:last_name])
        expect(user.email).to eq(valid_params[:email])
        expect(flash[:success]).to be_present
      end
    end

    context 'with invalid params' do
      it 'does not change user' do
        expect do
          put :update, params: { id: user.id, user: invalid_params }
        end.not_to change { user.reload.first_name }
        expect do
          put :update, params: { id: user.id, user: invalid_params }
        end.not_to change { user.reload.last_name }
      end
    end
  end
end